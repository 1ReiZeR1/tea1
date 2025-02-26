const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const { getTime, removeHeader } = require('./middlewares/common');
const morgan = require('morgan');

const authRouter = require("./routes/auth.router");
const tokenRouter = require('./routes/token.router');
const messageRouter = require('./routes/message.router');
const profileRouter = require('./routes/profile.router');
const likeRouter = require('./routes/like.router');

const teaRoutes = require("./routes/teaRoutes");

const commentsRouter = require("./routes/comments.router");

const app = express();

const corsOptions = {
    origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
  ],
    credentials: true 
  };

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(getTime);
app.use(removeHeader);

app.use("/api/auth", authRouter);
app.use("/api/tokens", tokenRouter);
app.use("/api/message", messageRouter);
app.use("/api/profile", profileRouter);
app.use("/api/like", likeRouter);

app.use("/api/teas", teaRoutes);

app.use("/api/comments", commentsRouter);


module.exports = app;