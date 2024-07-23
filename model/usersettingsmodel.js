const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userId:{required: true, type: String},
    newUpdate:{required: true, type: Boolean},
    newFeature:{required: true, type: Boolean},    
    desktopNotif:{required: true, type: Boolean}, 
    emailNotif:{required: true, type: Boolean}, 
    mobileNotif:{required: true, type: Boolean},     
    twoFactor:{required: true, type: Boolean}, 
    topGifters:{required: true, type: Boolean}, 
    upcomingList:{required: true, type: Boolean}, 
    giftExchange:{required: true, type: Boolean}, 
    pastList:{required: true, type: Boolean},
    createdById:{required: true, type: String},
    createdDate:{required: true, type: Date },
    updatedById:{required: true, type: String},
    updatedDate:{required: true, type: Date }
})

module.exports = mongoose.model('usersettings', dataSchema)


