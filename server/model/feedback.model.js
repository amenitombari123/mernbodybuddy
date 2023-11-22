
import mongoose from "mongoose";

export const FeedbackSchema = new mongoose.Schema({
  shortFeedback: {
    type: String,
    required: [true, "Short feedback is required"],
  },
  longFeedback: {
    type: String,
    required: [true, "Long feedback is required"],
  },
});

export default mongoose.model.Feedbacks || mongoose.model('Feedback', FeedbackSchema);
