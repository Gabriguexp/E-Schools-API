import {Router} from 'express';

const router = Router();
import * as authController from '../controller/auth.controller.js';

//import transporter from '../email.js';

router.post('/login', authController.login)

router.post('/register', authController.register)

router.post('/registerProfesor', authController.registerProfesor)

router.post('/checksessiontoken', authController.checkUserLogged)

router.post('/logout', authController.logout)

router.post('/inviteUser', authController.inviteUser)

router.get('/getInvitacion/:tokenRegistro', authController.getInvitacion)

/*
router.post('/inviteuser', function(req, res){
    console.log('invitando user')

    var mailOptions = {
        from: 'dwesggex@gmail.com',
        to: 'gabriguexp@gmail.com',
        subject: 'Test',
        text: 'That was easy!'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('error enviando email');  
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


    res.status(200).json({ message: "Test exitoso"  });
})

*/

export default router;
