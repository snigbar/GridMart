import { Request, Response } from 'express';

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      // Example logic
      const user = { id: 1, name: 'Akbar' };
      res.status(200).json({ message: 'Login successful', user });
    } catch (error: unknown) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
}

export default new AuthController();
