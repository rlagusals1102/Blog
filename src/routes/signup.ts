/** @file 회원가입 API 정보 파일 */

import { Request, Response } from 'express';
import User from '../Models/User';
import * as validate from '../validate';
import { encryptPassword } from '../utils/encryptPassword';

const path = '/signup';
const method = 'post';

// 입력 필드를 유효성 검사하는 함수
const validateField = (fieldName: string, value: unknown, validationFunc: (value: unknown) => boolean, errorMessages: Record<string, string>) => {
    if (!validationFunc(value)) {
        return {
            errorCode: 'ValidationError',
            errorMessage: `"${fieldName}" 문제가 있습니다.`
        };
    }
    return null;
};

// API 핸들러
const handler = async (req: Request, res: Response): Promise<Response> => {
    const fieldsToValidate = [
        { name: 'name', value: req.body.name, validationFunc: validate.checkString, validationArgs: [2, 20] },
        { name: 'age', value: req.body.age, validationFunc: validate.checkNumber },
        { name: 'gender', value: req.body.gender, validationFunc: validate.checkString },
        { name: 'id', value: req.body.id, validationFunc: validate.checkId },
        { name: 'password', value: req.body.password, validationFunc: validate.checkPassword },
        { name: 'phoneNumber', value: req.body.phoneNumber, validationFunc: validate.checkPhoneNumber },
        { name: 'email', value: req.body.email, validationFunc: validate.checkEmail },
        { name: 'friendsNumber', value: req.body.friendsNumber, validationFunc: validate.checkNumber },
        { name: 'inflowPath', value: req.body.inflowPath, validationFunc: validate.checkString, validationArgs: [1, 500] },
        { name: 'houseAddress', value: req.body.houseAddress, validationFunc: validate.checkString, validationArgs: [1, 500] }
    ];

    const validationErrors = fieldsToValidate.map(field => validateField(field.name, field.value, field.validationFunc, req.body[field.name]));

    const firstError = validationErrors.find(error => error !== null);
    if (firstError) {
        return res.status(400).json(firstError);
    }

    // 새로운 사용자를 생성하고 반환
    const encryptedPassword = encryptPassword(req.body.password, req.body.id);

    // 새로운 사용자를 생성하고 반환
    const user = await User.create({
        ...req.body,
        password: encryptedPassword
    });

    return res.status(200).json(user);
};

export { path, method, handler };
