import { Component } from "../core/core";
import aboutStore from "../store/about";

export default class About extends Component {
  render() {
    const { photo, name, email, github } = aboutStore.state;
    this.el.classList.add("container", "about");

    this.el.innerHTML = /* html */ `
    <div class="photo" style="background-image:url(${photo})"></div>
    <p class="name">${name}</p>
    <p><a href="https://mail.google.com/mail/u/0/?fs=1&to=yuji91818@gmail.com&tf=1&to=${email}" target="_blank">yuji918@naver.com</a></p>
    <p><a href="${github}" target="_blank">GitHub</a></p>
 


    
    
    `;
  }
}
