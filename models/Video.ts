import mongoose, { Schema, model, models } from "mongoose";


// Define the dimensions of the video
export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;


// Define the IVideo interface
export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    width: number;
    height: number;
    quality?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}


// Define the videoSchema
const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transformation: { // Define the transformation of the video
      width: {
        type: Number,
        default: VIDEO_DIMENSIONS.width,
      },
      height: {
        type: Number,
        default: VIDEO_DIMENSIONS.height,
      },
      quality: { // Define the quality of the video
        type: Number,
        min: 1,
        max: 100,
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema); // Create the Video model

export default Video;
