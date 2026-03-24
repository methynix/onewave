const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./middlewares/errorMiddleware');

// Route Imports
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// 1. GLOBAL MIDDLEWARES
app.use(helmet()); // Security Headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json({ limit: '10kb' })); // Body parser

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logging
}

// Rate Limiting (Prevent Brute Force)
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// 2. ROUTES
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/contact', contactRoutes);


// 3. UNHANDLED ROUTES
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// 4. GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

app.listen(process.env.PORT,()=>{
  console.log(`Server running at http://localhost:${process.env.PORT}`)
})