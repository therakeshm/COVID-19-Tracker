import React from "react"
import FadeIn from "react-fade-in"

import Widget from "../Widget/Widget"
import Placeholder from "../Placeholder/Placeholder"

class IndiaData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      indianData: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch("https://coronavirus-19-api.herokuapp.com/countries/india")
      .then(response => response.json())
      .then(json => {
        setTimeout(
          () =>
            this.setState({
              indianData: json,
              isLoaded: true,
            }),
          2000 // set loading time in milisecond
        )
      })
      .catch(errorMessage => {
        this.setState({
          errorMessage: "😕 Error loading data. Please try again",
          isLoaded: true,
        })
      })
  }

  render() {
    const { indianData, errorMessage } = this.state

    return (
      <React.Fragment>
        <div className="heading--title">
          <h1>Outbreak in India</h1>
        </div>

        {/* Conditional operator to decide what to show */}
        {this.state.isLoaded ? (
          <FadeIn>
            <div className="Grid--Row mb-lg-20">
              <div className="Grid--Item">
                <Widget
                  styleName="warning"
                  align="center"
                  value={indianData.cases} //.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
                  label="Confirmed cases"
                />
              </div>
              <div className="Grid--Item">
                <Widget
                  styleName="yellow"
                  align="center"
                  value={indianData.active}
                  label="Active cases"
                />
              </div>
              <div className="Grid--Item">
                <Widget
                  styleName="success"
                  align="center"
                  value={indianData.recovered}
                  label="Recovered"
                />
              </div>
              <div className="Grid--Item mb-sm-20">
                <Widget
                  styleName="danger"
                  align="center"
                  value={indianData.deaths}
                  label="Deaths"
                />
              </div>
            </div>

            <div className="Grid--Row">
              <div className="Grid--Item">
                <Widget
                  styleName="warning"
                  align="center"
                  value={indianData.todayCases} // .toLocaleString(navigator.language, { minimumFractionDigits: 0 })
                  label="Today cases"
                />
              </div>
              <div className="Grid--Item">
                <Widget
                  styleName="danger"
                  align="center"
                  value={indianData.todayDeaths}
                  label="Today deaths"
                />
              </div>
              <div className="Grid--Item">
                <Widget
                  styleName="danger"
                  align="center"
                  value={indianData.critical}
                  label="Critical"
                />
              </div>
            </div>
          </FadeIn>
        ) : (
          <div className="Grid--Row">
            <div className="Grid--Item">
              <Placeholder />
            </div>
            <div className="Grid--Item">
              <Placeholder />
            </div>
            <div className="Grid--Item">
              <Placeholder />
            </div>
          </div>
        )}

        {errorMessage ? (
          <>
            <hr />
            <div>{errorMessage}</div>
          </>
        ) : null}
      </React.Fragment>
    )
  }
}

export default IndiaData
