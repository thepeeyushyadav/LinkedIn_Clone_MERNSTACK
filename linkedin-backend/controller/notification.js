const NotificationModal = require("../models/notification");

exports.getNotification = async (req, res) => {
  try {
    let ownId = req.user._id;
    let notification = await NotificationModal.find({ receiver: ownId })
      .sort({ createdAt: -1 })
      .populate("sender receiver");
    return res.status(200).json({
      message: "Notification Fetched Successfully..",
      notification: notification,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

exports.updateRead = async (req, res) => {
  try {
    const { notificationId } = req.body;
    const notification = await NotificationModal.findByIdAndUpdate(
      notificationId,
      { isRead: true }
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification Not Found" });
    }
    return res.status(200).json({
      message: "Read Notification",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

exports.activeNotify = async (req, res) => {
  try {
    let ownId = req.user._id;
    let notifications = await NotificationModal.find({
      receiver: ownId,
      isRead: false,
    });

    return res.status(200).json({
      message: "Notifications Number Fetched Successfully",
      count: notifications.length,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};
