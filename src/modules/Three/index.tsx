import React, { Component } from 'react'
import { ThemesContext } from '../Parents'
import { LocalContext } from '../Child'
export default class Three extends Component {
  render() {
    return (
      <ThemesContext.Consumer>
        {
          value => { 
            return (
              <LocalContext.Consumer>
                {
                  local => {
                      return (
                        <span>{value + local}</span>
                      )
                  }
                }
              </LocalContext.Consumer>
            )
          }
        }
      </ThemesContext.Consumer>
    )
  }
}
