const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
};

module.exports.createNewCampground = async (req, res, next) => {
    const camp = new Campground(req.body.campground);
    camp.author = req.user._id
    await camp.save();
    req.flash('success', "Successfully added new campground!")
    res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.showCampground = async(req, res, next) => {
    const campground = await Campground.findById(req.params.id).populate({ 
        path :'reviews', 
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', "Cannot find thar campground!");
        return res.redirect('/camgrounds');
    }
    res.render('campgrounds/show', { campground });
};

module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
};

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (! campground) {
        req.flash('error', "Cannot find that campground!");
        return res.redirect('/camgrounds');
    }
    const camp = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    req.flash('success', "Successfully ungrated campground!")
    res.redirect(`/campgrounds/${camp._id}`)
};

module.exports.deleteCampground = async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', "Successfully deleted campground!")
    res.redirect('/campgrounds');
};



