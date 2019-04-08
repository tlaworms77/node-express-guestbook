const express = require( 'express' );
const GuestMessage = require( '../models/GuestMessage' );
const moment = require( 'moment' );

const router = express.Router();

router.route('/delete/:id').get(function(req, res, next){
    res.render('delete', {
        id: req.params.id
    });
});

router.route('/delete').post(function(req, res, next){
    GuestMessage.deleteOne(req.body, function(err){
        if(err){
            next(err);
            return;
        }

        res.redirect( '/' );
    });
});

router.route('/add').post(function(req, res, next){
    GuestMessage.create( req.body );
    res.redirect('/');
});

router.route(/.*/).get(function(req, res, next){
    GuestMessage.find({
    }, [
        '_id', 'name', 'message', 'regDate'
    ], {
        sort: {
            regDate: -1
        }
    },function(err, guestMessages){
        if(err){
            next(err);
            return;
        }
        res.render('list', {
            guestMessages: guestMessages,
            moment: moment
        });
    });
});


module.exports = router;