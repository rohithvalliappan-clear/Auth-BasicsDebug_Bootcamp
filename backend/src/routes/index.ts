import { Router, Response } from 'express';
import bcrypt from 'bcrypt';
import { users } from '../data/users';
import { products } from '../data/products';
import { signToken } from '../utils/jwt';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { getCart, addToCart } from '../data/cart';

const router = Router();

// --- Unprotected Routes ---

router.get("/hello", (_req, res: Response) => {
    res.send("Hello World!");
});

router.get("/products", (_req, res: Response) => {
    res.json(products);
});

// --- Auth Routes ---

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
    }

    const token = signToken({ username: user.username, role: user.role });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour
    });

    res.json({
        user: {
            username: user.username,
            role: user.role
        }
    });
});

router.post('/logout', (_req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

// --- Protected Routes ---

router.get('/cart', authMiddleware, (req: AuthRequest, res: Response) => {
    const username = req.user!.username;
    res.json({ cart: getCart(username) });
});

router.post('/add-to-cart', authMiddleware, (req: AuthRequest, res: Response) => {
    const { productId } = req.body;
    const username = req.user!.username;

    if (!productId) {
        res.status(400).json({ error: 'Product ID is required' });
        return;
    }

    addToCart(username, productId);
    res.json({ message: 'Product added to cart', cart: getCart(username) });
});

router.get('/profile', authMiddleware, (req: AuthRequest, res: Response) => {
    // Frontend expects { users: User[] }
    const usersList = users.map(u => ({ username: u.username, role: u.role }));
    res.json({ users: usersList });
});

export default router;
