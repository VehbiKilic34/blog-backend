import express from 'express';
import categoryRoutes from './routes/categoryRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';



const app = express();
const PORT = 3030;

app.use(express.json());
app.use('/comments', commentRoutes);
app.use('/comments', commentRoutes);
app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});