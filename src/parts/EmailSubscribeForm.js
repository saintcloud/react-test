const EmailSubscribeForm = (props) => {

    const random = Math.floor(Math.random() * 10000);
    const sampleLocation = window.location.href;
    const actualLink = sampleLocation.split('/').filter(e => e).pop();//used for reporting everywhere (it's the URL slug)

    // console.log('EmailSubscribeForm', props);

    return (
    <>
        <form id="" className="giddy-email-signup" method="post" action={'TODO' /* <?php echo site_url(); ?>/wp-admin/admin-ajax.php */}
            data-rand={random} data-action="Email subscribed" data-location={props.location} data-page={actualLink}>
            <div className="mc-container">
                <div className="form-group mc-email">
                    <label className="screen-reader-text visually-hidden-focusable" htmlFor={'subscribe-' + random}>Enter your email: </label>
                    <input id={'subscribe-' + random} type="email" placeholder="Email" name="user-email" className="user-email" required />
                    <span className="validation-error-message user-email-error" id={'user-email-error-' + random}></span>
                </div>
                <div className="form-group position-relative mc-sign-up">
                    <input type="submit" placeholder="Sign Up" id="user-signup" className="button full-width" value="Submit" />
                    <img src={`${process.env.PUBLIC_URL}/img/favicon-giddy-round.png`} id={'loader-' + random}
                        alt="processing form submission" width="24" height="24" className="rotate loader position-absolute" />
                    <span className="validation-error-message user-signup-error" id={'user-signup-error-' + random}></span>
                </div>
            </div>    
        </form>
    </>
    )

}

export default EmailSubscribeForm;    