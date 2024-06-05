import express from 'express'
import methodOverride from 'method-override'
import multer from 'multer'
import session from 'express-session'

// APIs
import * as signupAPI from './routes/signup'
import * as getUserMeAPI from './routes/getUserMe'
import * as loginAPI from './routes/login'
import * as createPostAPI from './routes/post/createPost'
import * as getPostsAPI from './routes/post/getPosts'
import * as getPostAPI from './routes/post/getPost'
import * as getPostHTMLAPI from './routes/post/getPostHTML'
import * as updatePostAPI from './routes/post/updatePost'
import * as deletePostAPI from './routes/post/deletePost'

// pages
import * as mainPage from './routes/views/main'
import * as viewPage from './routes/views/view'
import * as editPage from './routes/views/edit'
import * as loginPage from './routes/views/login'
import * as logoutPage from './routes/views/logout'

import * as loginController from './routes/views/loginController'
import * as deletePostController from './routes/views/deletePostController'
import * as updatePostController from './routes/views/updatePostController'

// models
import User from './Models/User'

interface Route {
  path: string
  method: 'post' | 'get' | 'put' | 'delete'
  handler: Function
}
 
const routes: Route[] = [
// APIs
  signupAPI,
  getUserMeAPI,
  loginAPI,
  createPostAPI,
  getPostsAPI,
  getPostAPI,
  getPostHTMLAPI,
  updatePostAPI,
  deletePostAPI,

  // pages
  mainPage,
  viewPage,
  editPage,
  loginPage,
  logoutPage,

  // controller
  loginController,
  deletePostController,
  updatePostController
]

// express-session 모듈에 새로운 세션 데이터 타입 정의
declare module 'express-session' { // express-session 모듈 안에 있는 type을 수정하겠다.
  interface SessionData { // express-session 안에 있는 SessionData 값을 만지겠다.
    _id: string
  }
}


//startServer
export async function startServer (): Promise<void> {
  const app = express()
  const upload = multer({ dest: 'static/' })

  app.use(methodOverride('_method')) // HTTP 메소드 오버라이딩을 위한 미들웨어 사용
  app.set('trust proxy', 1) // 프록시 신로 설정
  app.use(session({ // 세션 미들웨어 설정
    secret: 'cat keyboard', // 세션 시크릿 키
    resave: false,
    saveUninitialized: true,
    cookie: {}
  }))

  // server middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: true })) // URL 인코딩을 위한 미들웨어
  app.use(upload.fields([{ name: 'ooo' }])) // 파일 업로드를 위한 미들웨어
  app.use('/static', express.static('./src/static')) // 정적 파일 제공

  // set view engine
  app.set('view engine', 'ejs')
  app.set('views', './src/views')

  // 사용자 데이터를 렌더링 함수에 추가하여 모든 뷰에 정보를 전달하는 미들웨어 설정
  app.use((req, res, next) => {
    ;(async () => {
      const user = await User.findOne({ _id: req.session._id })

      const originalRender = res.render.bind(res)

      // 렌더링 함수를 재정의하여 사용자 정보 추가
      res.render = (fileName: string, renderData?: Record<string, any>) => {
        return originalRender(fileName, { user, ...renderData })
      }
    })()
      .then(() => {
        next()
      })
      .catch(err => {
        next(err)
      })
  })

  // api handlers
  routes.forEach(({ path, method, handler }) => {
    // api handlers
    app[method](path, (req, res, next) => {
      handler(req, res)
        .then(() => {
          next()
        })
        .catch((err: any) => {
          next(err)
        })
    })
  })

  const port = 3000
  await new Promise((resolve) => {
    app.listen(port, (): void => {
      resolve(null)
    })
  })
  console.log('Server ready')
}
