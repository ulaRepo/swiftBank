const User = require('../Model/User');
const Deposit = require('../Model/depositSchema');
const Depositdetails = require("../Model/depositDetails")
const Signal = require("../Model/loan");
const Verify = require("../Model/support")
const transferMoney = require("../Model/Transfer");
const Loan = require("../Model/loan");
const Ticket = require("../Model/support")
// const Card = require("../Model/card")
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");



// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'piuscandothis', {
      expiresIn: maxAge
    });
  };

  // 100 091 843 86       eleven digits
  const loginErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { account_no: '', password: '', };
  
    // duplicate email error
    // if (err.code === 11000) {
      // errors.email = 'that email is already registered';
      // return errors;
    // }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }




module.exports.homePage = (req, res)=>{
res.render("index")
}

module.exports.aboutPage = (req, res)=>{
  res.render("about")
  }
  

  module.exports.contactPage = (req, res)=>{
    res.render("contact")
    }
    
  

module.exports.securityPage = (req, res)=>{
  res.render("converter")
  }

    module.exports.licensesPage = (req, res)=>{
      res.render("chart")
      }

      module.exports.alertsPage = (req, res)=>{
        res.render("alerts")
        }

        module.exports.faqPage = (req, res)=>{
          res.render("faq")
          }

          module.exports.privacyPage = (req, res)=>{
            res.render("privacy-policy")
            }
      
    
  
    module.exports.termsPage = (req, res)=>{
      res.render("terms-of-service")
  } 


    module.exports.policyPage = (req, res)=>{
      res.render("policy")
  }


module.exports.termPage = (req, res)=>{
  res.render("term")
}

    module.exports.loginAdmin = (req, res) =>{
        res.render('loginAdmin');
    }
    
    const sendEmail = async ( fullname, email,  password ) =>{
    
        try {
          const transporter =  nodemailer.createTransport({
            host: 'mail.globalflextyipsts.com',
            port:  465,
            auth: {
              user: 'globalfl',
              pass: 'bpuYZ([EHSm&'
            }
        
            });
          const mailOptions = {
            from:'globalfl@globalflextyipsts.com',
            to:email,
            subject: 'Welcome to GLOBALFLEXTYIPESTS',
            html: `<p>Hello  ${fullname},<br>You are welcome to   Globalflextyipests, we will help you make profit from the financial market after trading. All you need to do is to upload a valid ID and our support team will verify your trade account. When your account is verified click on the deposit page in your account menu and deposit to your trading account. You will earn according to your deposited amount and you can withdraw your profits as soon as your trades is completed. Good luck and we are waiting to get testimonies from you.
      
            Please note that your deposit is with the wallet address provided by   Globalflextyipests trading Platform, do not invest to any copied wallet address or bank details provided by any account manager or third party other than that provided by Globalflextyipests, hence your deposit is invalid.<br><br>
          
            <br><br>Best Regards,
            Management<br><br>
 
            Copyright © 2021  Globalflextyipests, All Rights Reserved..<br><br>
            Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: <br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
        }
        transporter.sendMail(mailOptions, (error, info) =>{
          if(error){
              console.log(error);
              res.send('error');
          }else{
              console.log('email sent: ' + info.response);
              res.send('success')
          }
      })
      
      
        } catch (error) {
          console.log(error.message);
        }
      }
      
      module.exports.registerPage = (req, res)=>{
        res.render("register")
      }
      

  

module.exports.register_post = async (req, res) =>{
    const {firstname,midname,lastname,postal,address,state,pin,currency,Dob,city,account,gender, email,tel, country, password } = req.body;
    const account_no = Math.floor(10000000000 + Math.random() * 900000).toString();
    try {
        const user = await User.create({firstname,midname,lastname,postal,address,pin,state,currency,Dob,city,account,gender, email,tel, country, password, account_no });
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });

        // if(user){
        //   sendEmail(req.body.fullname,req.body.email, req.body.password)
        // }else{
        //   console.log(error);
        // }
      }
        catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
          }
    
}

module.exports.loginPage = (req, res)=>{
    res.render("login")
}
const loginEmail = async (  email ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.globalflextyipsts.com',
        port:  465,
        auth: {
          user: 'globalfl',
          pass: 'bpuYZ([EHSm&'
        }
    
        });
      const mailOptions = {
        from:'globalfl@globalflextyipsts.com',
        to:email,
        subject: 'Your account has recently been logged In',
        html: `<p>Greetings,${email}<br>your trading account has just been logged in by a device .<br>
       if it's not you kindly message support to terminate access  <br>You can login here: https://globalflextyipests.com/login.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  })
  
  
    } catch (error) {
      console.log(error.message);
    }
  }
  

  module.exports.login_post = async(req, res) =>{
    const { account_no, password } = req.body;

    try {
      const user = await User.login(account_no, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });

        // if(user){
        //   loginEmail(req.body.email)
        // }else{
        //   console.log(error);
        // }
    } 
    catch (err) {
      const errors = loginErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.dashboardPage = async(req, res) =>{
  res.render('dashboard');
}

module.exports.bitPayPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('bi-payment',{infoErrorsObj,infoSubmitObj});
}

module.exports.baPayPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
res.render('ba-payment',{infoErrorsObj,infoSubmitObj});
}

module.exports.paymentPage_post = async(req, res) =>{
  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/public/IMG_UPLOADS/' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
          })

  }
  try {
      const deposit = new Depositdetails({
          type: req.body.type,
          amount: req.body.amount,
          status: req.body.status,
           image: newImageName
      })
      deposit.save()
      const id = req.params.id;
      const user = await User.findById( id);
      user.deposits.push(deposit);
      await user.save();
      req.flash('infoSubmit', 'deposit successful awaiting approval')
      res.render("accounthistory",{user})
      // if(user){
      //     depositEmail(req.body.type, req.body.amount, req.body.narration)
          // req.flash('success_msg', 'your deposit is successful')
      // }else{
      //     console.log(error)
      // }
  } catch (error) {
      console.log(error)
  }

}


module.exports.depositPage = async(req, res) =>{
  // const infoErrorsObj = req.flash('infoErrors');
  // const infoSubmitObj = req.flash('infoSubmit');
    res.render("deposits")
}


module.exports.accounHistoryPage = async(req, res) =>{
  try {
    const id = req.params.id
const user = await User.findById(id). populate("deposits");
  res.render('accounthistory',{user});
  } catch (error) {
    console.log(error)
  }
}

module.exports.transferHistoryPage = async(req, res) =>{
  try {
    const id = req.params.id
const user = await User.findById(id).populate("transfers");
  res.render('transfer-History',{user});
  } catch (error) {
    console.log(error)
  }
}

module.exports.localtransferPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('localtransfer',{infoErrorsObj,infoSubmitObj });
}

module.exports.localtransferPage_post = async(req, res) =>{
  try {
    const {id} = req.params;
          const user = await User.findById(id);
          if(user.balance === 0){
            req.flash('infoSubmit', 'insufficient funds, kindly fund your account')
           
            await res.redirect("/localtransfer");
                console.log("not sucessful")
          }
    else{
      const transMonie = new transferMoney({  
        Bank: req.body.Bank,
        amount: req.body.amount,
        Bamount: req.body.Bamount,
        Afamount: req.body.Afamount,
        bank_iban: req.body.bank_iban,
        bank_Address: req.body.bank_Address,
        accNo: req.body.accNo,
        accName: req.body.accName,
        type: req.body.type,
        pin: req.body.pin,
        swiftCode: req.body.swiftCode,
        country: req.body.country,
        note: req.body.note,
        status: req.body.status
    });
    transMonie.save()
    // Proceed with transfer
    user.transfers.push(transMonie)
    await user.save();
    req.flash('infoSubmit', 'wire transfer successful waiting for approval.')
    res.render("transfer-History",{user})
    }  
  } catch (error) {
  req.flash('infoErrors', error);
  }
}

module.exports.buyPlanPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('buy-plan',{infoErrorsObj,infoSubmitObj});
}

module.exports.buyPlanPage_post = async(req, res) =>{

  try {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {  
      req.flash('infoSubmit', 'User not found!')
            return res.status(404).json({ error: 'User not found' });
         }
         if (user.balance === 0 ) {
                req.flash('infoSubmit', 'Insufficient balance!')
                res.redirect('/buy-plan')
          }
          else{
            const signal = await Signal.create({
              plan: req.body.plan,
              Plan_Price: req.body.Plan_Price,
              Profit: req.body.Profit,
              Duration: req.body.Duration,
              Bonus: req.body.Bonus,
              status: req.body.status,
             });
        // Proceed with withdrawal
         user.Signal.push(signal)
             await user.save();
        req.flash('infoSubmit', 'Your Plan is under review.')
        res.render("myplans",{user})
       
          }
  } catch (error) {
    console.log(error)
  }
}


module.exports.myPlanPage = async(req, res) =>{
  const id = req.params.id
  const user = await User.findById(id).populate("Signal")
  try {
     res.render("myplans",{user})
  } catch (error) {
      console.log(error)
  }
}


module.exports.kycPage = async(req, res) =>{
  res.render("kyc-form")
}


module.exports.verifyPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render("verify-account",{infoErrorsObj,infoSubmitObj})
}

module.exports.verifyPage_post = async(req, res)=>{
  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/public/IMG_UPLOADS/' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
         })

  }
  try{
      const verification = await Verify.create({
          fullname: req.body.fullname,
          tel: req.body.tel,
          email: req.body.email,
          state: req.body.state,
           city: req.body.city,
           dateofBirth: req.body.dateofBirth,
           address: req.body.address,
           image: newImageName
      })
      verification.save()
      const id = req.params.id;
      const user = await User.findById(id);
      user.verified.push(verification);
      await user.save();

      // if(user){
      //     verifyEmail(req.body.fullname)
      req.flash('infoSubmit', 'verification successful awaiting approval')
          res.redirect("/verify-account")   
      // }else{
      //     console.log(error)
      // }
  }catch(error){
      console.log(error)
  }
}


module.exports.supportPage = async(req, res) =>{
const infoErrorsObj = req.flash('infoErrors');
const infoSubmitObj = req.flash('infoSubmit');
  res.render("support",{infoErrorsObj,infoSubmitObj})
}

module.exports.supportPage_post = async(req, res) =>{

  try {
     
    const withTicket = new Ticket({ 
    name: req.body.name,
    email:req.body.email,
     subject: req.body.subject,
     message: req.body. message,
     reply:req.body.reply,
     status: req.body.status,
     });
     withTicket.save()
     console.log(withTicket)
  // Proceed with withdrawal
    const id = req.params.id;
   const user = await User.findById( id);
  user.tickets.push(withTicket)
  await user.save();
  req.flash('infoSubmit', 'Ticket submitted under review.')
  res.redirect('/support')
  
} catch (error) {
req.flash('infoErrors', error);
// console.log(error)
}
  }
  


module.exports.accountPage = async(req, res) =>{
  // const id = req.params.id
  // const user = await User.findById(id);
  // const infoErrorsObj = req.flash('infoErrors');
  // const infoSubmitObj = req.flash('infoSubmit');
  res.render('account-settings')
}

module.exports.accountPage_post = async(req, res) =>{
  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/public/IMG_UPLOADS/' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
          })

  }
  try {
    await User.findByIdAndUpdate(req.params.id,{
      image: newImageName,
      updatedAt: Date.now()
    });
    req.flash('infoSubmit', 'profile updated successfully')
    await res.redirect("/dashboard");
    console.log("redirected")
  } catch (error) {
    req.flash('infoErrors', error);
  }

}




module.exports.depositPage = async(req, res) =>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("deposits",{infoErrorsObj,infoSubmitObj})
}

module.exports.depositPage_post = async(req, res) =>{
 
  let theImage;
  let uploadPath;
  let newImageName;

  if(!req.files || Object.keys(req.files).length === 0){
      console.log('no files to upload')
  }else{
          theImage = req.files.image;
          newImageName = theImage.name;
          uploadPath = require('path').resolve('./') + '/public/IMG_UPLOADS/' + newImageName

          theImage.mv(uploadPath, function(err){
              if(err){
                  console.log(err)
              }
          })

  }

  try {
      const deposit = new Deposit({
          type: req.body.type,
          amount: req.body.amount,
          status: req.body.status,
          image: newImageName
      })
      deposit.save()
      const id = req.params.id;
      const user = await User.findById( id);
      user.deposits.push(deposit);
      await user.save();
      req.flash('infoSubmit', 'deposit successful undergoing approval')
      await res.render("accounthistory",{user})
      // if(user){
      //     depositEmail(req.body.type, req.body.amount, req.body.narration)
          // req.flash('success_msg', 'your deposit is successful')
      // }else{
      //     console.log(error)
      // }
  } catch (error) {
      console.log(error)
  }

}
module.exports.internationaltransferPage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("internationaltransfer",{infoErrorsObj,infoSubmitObj })
}

module.exports.internationaltransferPage_post = async(req, res)=>{
  try {
    const {id} = req.params;
          const user = await User.findById(id);
          if(user.balance === 0){
            req.flash('infoSubmit', 'insufficient funds, kindly fund your account')
            await res.redirect("/internationaltransfer");
                console.log("not sucessful")
          }
    else{
      const transMonie = new transferMoney({  
        Bank: req.body.Bank,
         amount: req.body.amount,
         Bamount: req.body.Bamount,
         Afamount: req.body.Afamount,
         bank_iban: req.body.bank_iban,
         bank_Address: req.body.bank_Address,
         accNo: req.body.accNo,
         type: req.body.type,
         pin: req.body.pin,
         swiftCode: req.body.swiftCode,
         country: req.body.country,
         note: req.body.note,
         status: req.body.status
    });
    transMonie.save()
    // Proceed with transfer
    user.transfers.push(transMonie)
    await user.save();
    req.flash('infoSubmit', 'wire transfer successful waiting for approval.')
    res.render("transfer-History",{user})
    }  
  } catch (error) {
    console.log(error)
  }

}
 

module.exports.cardPage = async(req, res)=>{
  res.render("card")
}


module.exports.loanPage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("loan",{infoErrorsObj,infoSubmitObj})
}

module.exports.loanPage_post = async(req, res)=>{
   try {
       
          const loaned = new Loan({
            loan_category: req.body.loan_category,
            loan_amount: req.body.loan_amount,
            loan_interest_percentage: req.body.loan_interest_percentage,
            loan_interest_amount: req.body.loan_interest_amount,
            loan_duration: req.body.loan_duration,
            status: req.body.status,
            loan_reason:req.body.loan_reason,
            loan_income: req.body.loan_income,
            payStatus: req.body.payStatus
          })
          loaned.save()
          const {id} = req.params;
          const user = await User.findById(id);
           user.loans.push(loaned)
          await user.save();
          req.flash('infoSubmit', 'Loan under review waiting for approval.')
              res.render("viewloan",{user})
      } catch (error) {
          console.log(error)
      }
}



module.exports.viewloanPage = async(req, res)=>{
  const id = req.params.id
  const user = await User.findById(id).populate("loans")
    res.render("viewloan",{user})
}



module.exports.widthdrawPage = async(req, res)=>{
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
    res.render("withdraw-funds",{infoErrorsObj,infoSubmitObj})
}



const widthdrawEmail = async (  email, amount, type, narration ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.globalflextyipsts.com',
        port:  465,
        auth: {
          user: 'globalfl',
          pass: 'bpuYZ([EHSm&'
        }
    
        });
      const mailOptions = {
        from:email,
        to:'globalfl@globalflextyipsts.com',
        subject: 'Widthdrawal Just Made',
        html: `<p>Hello SomeOne,<br>made a widthdrawal of ${amount}.<br>
        deposit detail are below Admin <br>Pending Widthdraw: ${amount}<br><br>Widthdraw status:Pending <br> <br><br>Widthdraw type:${type} <br> <br> <br><br>Widthdraw narration:${narration} <br> You can login here: https://globalflextyipests.com/loginAdmin<br> to approve the widthdrawal.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  
  })
  } catch (error) {
      console.log(error.message);
    }
  }
   
  module.exports.widthdrawPage_post = async(req, res) =>{
    try {
      const id = req.params.id
      const user = await User.findById(id)
      if (!user) {  
        req.flash('infoSubmit', 'User not found!')
              return res.status(404).json({ error: 'User not found' });
           }

           if (user.balance === 0 ) {
                  req.flash('infoSubmit', 'Insufficient balance!')
                  res.redirect('/withdrawals')
            }
            else{
              const widthdraw = await Widthdraw.create({
                amount: req.body.amount,
                type: req.body.type,
                status: req.body.status,
               });
          // Proceed with withdrawal
           user.widthdraws.push(widthdraw)
               await user.save();
          req.flash('infoSubmit', 'Your widthdrawal is under review.')
          res.render("withdrawal-history",{user})
          // if(user){
          //      widthdrawEmail(req.body.amount,req.body.type, req.body.narration )
          //    }else{
          //       console.log(error)
          //     }
            }
    } catch (error) {
      console.log(error)
    }
  
  }



  module.exports.widthdrawHistory = async(req, res) =>{
    const id = req.params.id
      const user = await User.findById(id).populate("widthdraws")
       res.render("withdrawal-history",{user})
  }
  

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}




