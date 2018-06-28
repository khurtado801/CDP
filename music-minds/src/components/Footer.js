import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="push">
                <div className="footer">
                    <div class="contact-items-wrapper">
                        <h3>
                            <a href="https://www.linkedin.com/in/khurtado801/">
                                <i class="glyphicon glyphicon-pencil"></i>LinkedIn</a>
                            <a href="https://github.com/khurtado801/Web-Dev-Projects">
                                <i class="glyphicon glyphicon-cloud"></i>GitHub</a>
                            <a href="https://drive.google.com/open?id=1rAKLHbC4GLqc17S4YTQwpQY2A9Edmj1o">
                                <i class="glyphicon glyphicon-list-alt"></i>My Resume</a>
                        </h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
