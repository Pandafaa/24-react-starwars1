import React from 'react';
import styles from '../css_modules/contact.module.css';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    getOptions(planets) {
        let options = [...planets];
        return options.map(p => <option key={p}>{p}</option>);
    }

    componentDidMount() {
        const planetsInfo = JSON.parse(localStorage.getItem('planets_info')); // parse
        if(planetsInfo && planetsInfo.exp > new Date().getTime()) {
            this.setState({
                isLoading: false,
                planetsInfo
            })
        } else {
            fetch("https://sw-info-api.herokuapp.com/v1/planets")
                .then(data => data.json())
                .then(data => {
                    let planetsInfo = {
                        planetNames: data.map(p => p.name),
                        exp: new Date().getTime()+1000*60*60*24*30
                    }
                    this.setState({
                        isLoading: false,
                        planetsInfo
                    })
                    localStorage.setItem('planets_info', JSON.stringify(planetsInfo));
                })
        }

    }

    render() {
        if(this.state.isLoading) {
            return(
                <div>loading..</div>
            );
        } else {
            return (
                <div className={styles.container}>
                    <form>
                        <label htmlFor="fname">First Name</label>
                        <input type="text" name="firstname" placeholder="Your name.."/>

                            <label htmlFor="lname">Last Name</label>
                            <input type="text" name="lastname" placeholder="Your last name.."/>

                                <label htmlFor="country">Country</label>
                                <select name="country">
                                    {this.getOptions(this.state.planetsInfo.planetNames)}
                                </select>

                                <label htmlFor="subject">Subject</label>
                                <textarea name="subject" placeholder="Write something.."></textarea>

                                <input type="submit" value="Submit"/>
                    </form>
                </div>
            );
        }
    }
};

export default Contact;