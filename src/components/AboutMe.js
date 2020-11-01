import React from 'react';

class AboutMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const about_info = JSON.parse(localStorage.getItem('about_info')); // parse
        if(about_info && about_info.exp > new Date().getTime()) {
            console.log("there is info")
            this.setState({
                isLoading: false,
                about_info
            });
        } else {
            fetch("https://sw-info-api.herokuapp.com/v1/peoples/1").then(response => response.json())
                .then(data => {
                    let about_info = {
                        name: data.name,
                        height: data.height,
                        birthYear: data.birth_year,
                        gender: data.gender,
                        mass: data.mass,
                        hairColor: data.hair_color,
                        skinColor: data.skin_color,
                        eyeColor: data.eye_color,
                        exp: new Date().getTime()+30*86400*1000
                    };
                    this.setState({
                        isLoading: false,
                        about_info
                    });
                    localStorage.setItem("about_info", JSON.stringify(about_info));
                })
        }
    }

    render() {
        if(!this.state.isLoading) {
            return (
                <div>
                    <p>name: {this.state.about_info.name}</p>
                    <p>height: {this.state.about_info.height}</p>
                    <p>birth year: {this.state.about_info.birthYear}</p>
                    <p>gender: {this.state.about_info.gender}</p>
                    <p>mass: {this.state.about_info.mass}</p>
                    <p>hair color: {this.state.about_info.hairColor}</p>
                    <p>skin color: {this.state.about_info.skinColor}</p>
                    <p>eye color: {this.state.about_info.eyeColor}</p>
                </div>
            );
        } else {
            return(
                <div>Loading..</div>
            )
        }
    }
}

export default AboutMe;