const CommentModal = require('../models/comment');
const PostModel = require('../models/post');
const NotificationModal = require('../models/notification');


exports.commentPost = async(req, res) => {
    try{
        const { postId, comment } = req.body;
        const userId = req.user._id;

        const postExist = await PostModel.findById(postId).populate("user");
        if(!postExist) {
            return res.status(400).json({
                error: "No Such POst Found"
            });
        }
        postExist.comments = postExist.comments + 1;
        await postExist.save();

        const newComment = new CommentModal({ user: userId, post: postId, comment});
        await newComment.save();

        const populatedComment = await CommentModal.findById(newComment._id).populate('user', 'f_name headline profilePic');

        const content =`${req.user.f_name} has commented on your Post`;
        const notification = new NotificationModal({ sender: userId, receiver: postExist.user._id, content, type:'comment', postId: postId.toString() });

        await notification.save();
        return res.status(200).json({
            message: "Commented Successfully",
            comment: populatedComment
        });
    } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
}

exports.getCommentByPostId = async(req, res) => {
    try{
        const { postId }  = req.params;
        const isPostExist = await PostModel.findById(postId);
        if(!isPostExist) {
            return res.status(400).json({
                error: "No Such Post Found"
            });
        }
        const comments = await CommentModal.find({post: postId}).sort({ createdAt: -1}).populate("user", "f_name headline profilePic");
        return res.status(201).json({
            message: "Comments Fetched",
            comments: comments
        });

    } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
}