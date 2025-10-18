const MessageModal = require("../models/message");

exports.sendMessage = async (req, res) => {
  try {
    let { conversation, message, picture } = req.body;
    let addMessage = new MessageModal({
      sender: req.user._id,
      conversation,
      message,
      picture,
    });
    await addMessage.save();
    let populatedMessage = await addMessage.populate("sender");
    return res.status(201).json(populatedMessage);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

exports.getMessage = async (req, res) => {
  try {
    let { convId } = req.params;
    let message = await MessageModal.find({
      conversation: convId,
    }).populate("sender");
    return res.status(200).json({
      message: "Fetched Message Successfully",
      message,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};
