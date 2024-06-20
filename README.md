# Blog
> 서울 디지텍고등학교 전공 동아리 "스마트 스페이스" 특강 프로젝트 입니다.

## API 명세서

## CRUD
| API 이름        | 엔드포인트          | 메소드 | 요청 파라미터   | 응답 예시       |
|----------------|---------------------|--------|----------------|----------------|
| 내 유저 정보 조회 | /user/me            | GET    | 세션 ID         | 사용자 정보     |
| 로그인          | /login              | POST   | id, password   | 로그인 성공 여부|
| 회원가입        | /signup             | POST   | 사용자 정보     | 생성된 사용자 정보|
| 게시물 생성      | /post/createPost    | POST   | 게시물 정보     | 생성된 게시물 정보|
| 게시물 삭제      | /post/deletePost/:id| DELETE | 게시물 ID       | 삭제 성공 여부  |
| 게시물 조회      | /post/getPost/:id   | GET    | 게시물 ID       | 게시물 정보     |
| 게시물 목록 조회 | /post/getPosts      | GET    | 없음            | 게시물 목록     |
| 게시물 수정      | /post/updatePost/:id| PUT    | 게시물 정보     | 수정된 게시물 정보|

## UI
| API 이름           | 엔드포인트                    | 메소드 | 요청 파라미터   | 응답 예시       |
|-------------------|-------------------------------|--------|----------------|----------------|
| 게시물 삭제 렌더링 | /posts-controller/:postId      | DELETE | 세션 ID         | 사용자 정보     |
| 게시물 편집 페이지 | /posts/:postId/edit            | GET    | id, password   | 로그인 성공 여부|
| 로그인 페이지       | /login                        | GET    | 사용자 정보     | 생성된 사용자 정보|
| 로그인 컨트롤러     | /login-controller             | POST   | 게시물 정보     | 생성된 게시물 정보|
| 로그아웃           | /logout                       | POST   | 게시물 ID       | 삭제 성공 여부  |
| 메인 페이지        | /                             | GET    | 게시물 ID       | 게시물 정보     |
| 게시물 수정 렌더링 | /posts-controller/:postId      | PUT    | 없음            | 게시물 목록     |
| 게시물 보기        | /posts/:postId/view            | GET    | 게시물 정보     | 수정된 게시물 정보|
