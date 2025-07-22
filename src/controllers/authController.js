const authService = require('../services/authService');

class AuthController {
     // 회원가입
    async register(req, res, next) {
        try {
            const { error } = registerSchema.validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const user = await authService.register(req.body);

            return res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            next(error);

            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // 로그인
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { error } = loginSchema.validate({ email, password });

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { user, token } = await authService.login(email, password);

            return res.status(200).json({ message: 'Login successful', user, token });
        } catch (error) {
            next(error);
            
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}