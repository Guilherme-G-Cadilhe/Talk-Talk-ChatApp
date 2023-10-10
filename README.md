<h1 align="center">
  <img alt="Filmpire" title="Filmpire" src="/assets/images/talktalkalternative.png" width="90px" />
 Talk Talk Chat App
</h1>

<p align="center">
  <a href="#about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Learned">License</a>
</p>

---

<p align="center">
  <img alt="TalkTalkDemo" title="TalkTalkApp" src="/assets/githubMedia/fullDemo.gif"/>
</p>

---

<br>
<details align = "left">
<summary> <b> Summary of the Contents </b> <i>(Click here to Expand it!)</i> </summary>
 <br>

<!--ts-->

- About
- Features  
  - Login and Register
  - Available Chats and Joined Chats List
  - Notification System
  - Toggleable Dark Theme
  - Channel Creation
  - Dynamic Chat Lobby with Messaging
- Technologies
- Installing and Contributing
- What have i learned?
- License
- Contributors
- Author
  <!--te-->
   </details

<br>
<br>

<h2 id ="about" align="center">📌 About</h2>

**Talk Talk ChatApp** is an Desktop Chat Application that enables people to talk with each other via text. It is built using advanced JavaScript tools, including React.js, Zustand, Electron, Webpack and Firebase.

---

> **Talk** with your Friends, join or create new **communities** and **socialize** with other **members**.

<h2 id="Features" align="center">⚙️ Features</h2>

<h3> 🧷 Login and Register</h3>

- Easily create your **Email and Password Account** while defining your **Profile Picture and Username**. Or Login in your already existing one..
<details>
<summary> <b> Demonstration Gif </b> <i>(Click here to Expand it!)</i> </summary>
 <br>
  <img alt="accountGif" title="accountGif" src="/assets/githubMedia/account.gif" width="800px" />
</details
<br>
 
 ---

<h3> 🧷 Available Chats and Joined Chats List</h3>

 - On the **Home Page** you can easily **Join available channel's** and **Enter subscribed channels to Chat**.
 - Channels have a short description and an image.
<details>
<summary> <b> Demonstration Gif </b> <i>(Click here to Expand it!)</i> </summary>
 <br>
  <img alt="listChannelsGif" title="listChannelsGif" src="/assets/githubMedia/listChannels.gif" width="800px" />
</details
<br>
 
 ---

<h3> 🧷 Notification System</h3>

 - On the **Settings page** you can Toggle Notifications On and Off for the App.
 - Notifications include a **System Alert** of your **connection Status when going Offline or Online**.
<details>
<summary> <b> Demonstration Gif </b> <i>(Click here to Expand it!)</i> </summary>
 <br>
  <img alt="notificationGif" title="notificationGif" src="/assets/githubMedia/notification.gif" width="800px" />
</details
<br>
 
 ---

<h3> 🧷 Toggleable Dark Theme</h3>

 - On the **Settings page** you can **Toggle Dark Theme On and Off** for the App.
<details>
<summary> <b> Demonstration Gif </b> <i>(Click here to Expand it!)</i> </summary>
 <br>
  <img alt="darkThemeGif" title="darkThemeGif" src="/assets/githubMedia/darktheme.gif" width="800px" />
</details
<br>
 
 ---

 <h3> 🧷 Channel Creation</h3>

 - On the **Home Page** there is a **New Channel Button** that enable's you to **Create a Channel**.
 - to create a new Channel, define its **Description, Name, and Image**.
<details>
<summary> <b> Demonstration Gif </b> <i>(Click here to Expand it!)</i> </summary>
 <br>
  <img alt="createChannelGif" title="createChannelGif" src="/assets/githubMedia/createChannel.gif" width="800px" />
</details
<br>
 
 ---

 <h3> 🧷 Dynamic Chat Lobby with Messaging</h3>

 - **Joining any subscribed Channel** allows you to **Message its others Participants in real-time**.
 - See which member is **Online or Offline** by its Status Icon above its Profile Image.
<details>
<summary> <b> Demonstration Gif </b> <i>(Click here to Expand it!)</i> </summary>
 <br>
  <img alt="chatInteractionGif" title="chatInteractionGif" src="/assets/githubMedia/chatInteraction.gif" width="800px" />
</details
<br>
 
 ---


<h2 id="Technologies" align="center">💻 Technologies</h2>

In this project it was utilized: <i>**Javascript, React, Zustand, Electron, Firebase && Firestore, Webpack, Babel**</i><br><br>

- <i>**JavaScript**</i> - The **core programming language** that powers the project.<br>
- <i>**React**</i> - The framework for **building dynamic user interfaces** and **managing application state**.<br>
- <i>**Zustand**</i> - A **minimalist state management library** that **simplifies data management and state updates**.<br>
- <i>**Electron**</i> - The platform for **building cross-platform desktop applications using web technologies**.<br>
- <i>**Firebase && Firestore**</i> - Firebase provides the **backend infrastructure**, while Firestore is the **real-time NoSQL database for seamless data storage and synchronization**.<br>
- <i>**Webpack**</i> - The build tool that **bundles and optimizes your project's assets and dependencies**.<br>
- <i>**Babel**</i> - The **JavaScript compiler** that allows you to use the latest ECMAScript features and ensures compatibility with older browsers..<br>

<h2 align="center"> 📦 Installing and Contributing</h2>
  
To get started, fork the repository and then run the following commands:

1. Install NPM packages

```sh
npm install
```

2. Configure your .ENV
   Setup your firebase enviroment project for free at - [FireBase Console](https://console.firebase.google.com/?hl=pt-br).
   Creating a **RealTime Database, Firestore Database and Authentication**

```sh
FIRESTORE_API_KEY=<put your key here>
FIRESTORE_AUTH_DOMAIN=<put your key here>
FIRESTORE_PROJECT_ID=<put your key here>
FIRESTORE_STORAGE_BUCKET=<put your key here>
FIRESTORE_MESSAGING_SENDER_ID=<put your key here>
FIRESTORE_APP_ID=<put your key here>
FIRESTORE_MEASUREMENT_ID=<put your key here>
FIRESTORE_DB_URL=<put your key here>
```

3. Compile its Files with Webpack

```sh
npm run watch (local)
or
npm run build (prod)
```

4. Build the Application .Exe and Installer for your operating system
```sh
npm run make:linux
or
npm run make:macos
or
npm run make:win
```

5. On the generated 'dist' folder, execute the App.

<br>

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
</br></br>
✏️ To contribute, do the following:

1. Fork the Project
2. Create your Feature Branch. (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes. (`git commit -m 'Adding some AmazingFeature'`)
4. Push to the Branch. (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<h2 id="Learned" align="center">☕ What have i learned?</h2>

> With this project i was able to further advance my **Technical Skills and Knowledge** with **Electron** and understand how to **communicate between its Render(FrontEnd) and Main(BackEnd)** to make Api's calls and receive its response on the Render.<br>
> I also learned how to **easily customize and setup a Electron Enviroment capable of using any Framework by reading JS Source Maps generated by Webpack and its Configs**.<br>
> Practiced how to **Create Custom Menu for the Application, and a Custom Loading View before the App is fully loaded**.<br>
> Used it's **Notification api** to create a custom option settings that communicates user's connection status by emiting events between its Render and Main server.<br>
> **Practiced Good Electron Patterns and Structuring**.<br>
> Got to understand how to **Integrate Webpack and Babel with Electron**.<br>
> I learned how to **setup and configure Electron Builder, to Generate and Publish Electron Apps**.<br>
> Got to understand how to **utilize Firebase's Realtime Database to subscribe to events on the database**, and utilize this as a leverage to **build the Dynamic Messaging System on the Chats**.<br>
> Inspired me to abandon Redux and **Learn Zustand from sratch and Integrate it on the Project**, Adapting it to every Redux situation. And learning to love this minimalistic library<br>
> Also did a **Secondary Electron App** that integrates **ChatGPT** and uses **Typescript** too, along with **Electron-Forge** instead of Electron-Builder, to **Build and Publish the new App**<br>

## 📝 License

Distributed under the **MIT** License.

## 🤝 Contributors

Thanks to the following people who contributed to this project in some way:
<br><br>
<b>Nobody yet, see something that you want to improve on this project? Share it with me!.<b/>

<!--<table>
  <tr>
    <td align="center">
      <a href="">
        <!--<img src="" alt=""/><br>
        <sub>
          <b></b>
        </sub>
      </a>
    </td>
  </tr>
</table>-->

<h2>Author</h2>

Made with 💜 and dedication by me **Guilherme G Cadilhe** Aka: **Bobnini**. <br>

<h2>Acknowledgments</h2>

Used resources:
- [Udemy - Electron & React JS: Build Desktop Chat App with Javascript](https://www.udemy.com/user/filip-jerga/)
- [My Electron Annotations](https://bobnini.notion.site/Electron-3be82a23d5914ae19294faf67442e80c?pvs=4)
- [Secondary Application](https://github.com/Guilherme-G-Cadilhe/electron-chatgpt-app)
