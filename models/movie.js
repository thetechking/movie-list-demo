import { Schema, model, models } from 'mongoose';

const MovieSchema = new Schema({
  title: {
    type: String,
    trim : true,
    required: [true, 'Movie title is required!'],
  },
  publishedYear:{
    type : String,
    trim: true,
    required: [true, 'Movie Published year is required!'],
  },
  moviePoster: {
    type: String,
    trim: true,
    required: [true , "Movie Poster is required"]
  }
});

const Movie = models.Movie || model("Movie", MovieSchema);

export default Movie;