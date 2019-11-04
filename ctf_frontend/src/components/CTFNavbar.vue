<template>
  <div class="navbar">
    <div class="problems">
      <div class="btn-group">
        <li @click="toggleLanguageMenu()" class="dropdown-toggle" v-if="languageOption.name !== undefined">
          {{ languageOption.name }}
          <span class="caret"></span>  
        </li>
        <li @click="toggleLanguageMenu()" class="dropdown-toggle" v-if="languageOption.name === undefined">
          {{ placeholderTextLanguage }}
          <span class="caret"></span>  
        </li>

        <ul class="dropdown-menu" v-if="showLanguageMenu">
          <li v-for="(option, idx) in languageOptions" :key="idx">
            <a href="javascript:void(0)" @click="updateLanguageOption(option)">
              {{ option.name }}
            </a>
          </li>
        </ul>
      </div>
      
      <div class="btn-group">
        <li @click="toggleThemeMenu()" class="dropdown-toggle" v-if="themeOption.name !== undefined">
          {{ themeOption.name }}
          <span class="caret"></span>  
        </li>
        <li @click="toggleThemeMenu()" class="dropdown-toggle" v-if="themeOption.name === undefined">
          {{ placeholderTextTheme }}
          <span class="caret"></span>  
        </li>

        <ul class="dropdown-menu" v-if="showThemeMenu">
          <li v-for="(option, idx) in themeOptions" :key="idx">
            <a href="javascript:void(0)" @click="updateThemeOption(option)">
              {{ option.name }}
            </a>
          </li>
        </ul>
      </div>

      <div class="btn-group">
        <li @click="toggleAlgoSiteMenu()" class="dropdown-toggle" v-if="algoSiteOption.name !== undefined">
          {{ algoSiteOption.name }}
          <span class="caret"></span>  
        </li>
        <li @click="toggleAlgoSiteMenu()" class="dropdown-toggle" v-if="algoSiteOption.name === undefined">
          {{ placeholderTextAlgoSite }}
          <span class="caret"></span>  
        </li>

        <ul class="dropdown-menu" v-if="showAlgoSiteMenu">
          <li v-for="(option, idx) in algoSiteOptions" :key="idx">
            <a href="javascript:void(0)" @click="updateAlgoSiteOption(option)">
              {{ option.name }}
            </a>
          </li>
        </ul>
      </div>

    </div>
    <!-- <button class="runButton">RUN</button> -->
    <div class="clear"></div>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
        languageOption: {
          name: '',
        },
        showLanguageMenu: false,
        placeholderTextLanguage: '언어',
        languageOptions: [
          { id: 0, name: 'C++' }
        ],
        closeOnOutsideClickLanguage: {
          default: true
        },
        selectedLanguage: {},
        placeholderLanguage: '',
        showThemeMenu: false,
        themeOption: {
          name: '',
        },
        placeholderTextTheme: '테마',
        themeOptions: [
          { id: 0, name: 'default' }
        ],
        selectedTheme: {},
        placeholderTheme: '',
        closeOnOutsideClickTheme: {
          default: true
        },
        showAlgoSiteMenu: false,
        algoSiteOption: {
          name: '',
        },
        placeholderTextAlgoSite: '문제사이트',
        algoSiteOptions: [
          { id: 0, name: 'SWEA' }
        ],
        selectedAlgoSite: {},
        placeholderAlgoSite: '',
        closeOnOutsideClickAlgoSite: {
          default: true
        }
      }
    },
    mounted() {
      this.languageOption = this.selectedLanguage;
      if (this.placeholderLanguage){
        this.placeholderTextLanguage = this.placeholderLanguage;
      }

      this.themeOption = this.selectedTheme;
      if (this.placeholderTheme){
        this.placeholderTextTheme = this.placeholderTheme;
      }

      this.algoSiteOption = this.selectedAlgoSite;
      if (this.placeholderAlgoSite){
        this.placeholderTextAlgoSite = this.placeholderAlgoSite;
      }

      if (this.closeOnOutsideClickLanguage) {
        document.addEventListener('click', this.clickHandlerLanguage);
      }
      if (this.closeOnOutsideClickTheme){
        document.addEventListener('click', this.clickHandlerTheme);
      }
      if (this.closeOnOutsideClickAlgoSite){
        document.addEventListener('click', this.clickHandlerAlgoSite);
      }
    },
    beforeDestroy(){
      document.removeEventListener('click', this.clickHandlerLanguage);
      document.removeEventListener('click', this.clickHandlerTheme);
      document.removeEventListener('click', this.clickHandlerAlgoSite);
    },
    methods: {
      updateLanguageOption(option) {
        this.languageOption = option;
        this.showLanguageMenu = false;
        this.$emit('updateLanguageOption', this.languageOption);
      },
      toggleLanguageMenu() {
        this.showLanguageMenu = !this.showLanguageMenu;
      },
      updateThemeOption(option){
        this.themeOption = option;
        this.showThemeMenu = false;
        this.$emit('updateThemeOption', this.showThemeMenu);
      },
      toggleThemeMenu(){
        this.showThemeMenu = !this.showThemeMenu;
      },
      updateAlgoSiteOption(option){
        this.algoSiteOption = option;
        this.showAlgoSiteMenu = false;
        this.$emit('updateAlgoSiteOption', this.showAlgoSiteMenu);
      },
      toggleAlgoSiteMenu(){
        this.showAlgoSiteMenu = !this.showAlgoSiteMenu;
      },
      clickHandlerLanguage(event) {
        const { target } = event;
        const { $el } = this;

        if (!$el.contains(target)) {
          this.showLanguageMenu = false;
        }
      },
      clickHandlerTheme(event) {
        const { target } = event;
        const { $el } = this;

        if (!$el.contains(target)) {
          this.showThemeMenu = false;
        }
      },
      clickHandlerAlgoSite(event) {
        const { target } = event;
        const { $el } = this;

        if (!$el.contains(target)) {
          this.showAlgoSiteMenu = false;
        }
      }
    }
  }
</script>

<style scoped>
  .navbar {
    height: 10vh;
    width: 100%;
    background-color: #CFEAFF;
  }

  .problems {
    margin-left: -7vw;
    list-style: none;
    float: left;
  }

  .runButton {
    float: right;
  }

  .clear {
    clear: both;
  }

  .btn-group {
    min-width: 160px;
    height: 40px;
    position: relative;
    margin: 10px 1px;
    display: inline-block;
    vertical-align: middle;
  }
  .btn-group a:hover {
    text-decoration: none;
  }

  .dropdown-toggle {
    color: #636b6f;
    min-width: 160px;
    padding: 10px 20px 10px 10px;
    text-transform: none;
    font-weight: 300;
    margin-bottom: 7px;
    border: 0;
    background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2);
    background-size: 0 2px, 100% 1px;
    background-repeat: no-repeat;
    background-position: center bottom, center calc(100% - 1px);
    background-color: transparent;
    transition: background 0s ease-out;
    float: none;
    box-shadow: none;
    border-radius: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .dropdown-toggle:hover {
    background: #CFEAFF;
    cursor: pointer;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;
  }

  .dropdown-menu > li > a {
    padding: 10px 30px;
    display: block;
    clear: both;
    font-weight: normal;
    line-height: 1.6;
    color: #333333;
    white-space: nowrap;
    text-decoration: none;
  }
  .dropdown-menu > li > a:hover {
    background: #efefef;
    color: #409FCB;
  }

  .dropdown-menu > li {
    overflow: hidden;
    width: 100%;
    position: relative;
    margin: 0;
  }

  .caret {
    width: 0;
    position: absolute;
    top: 19px;
    height: 0;
    margin-left: -24px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid \9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    right: 10px;
  }

  li {
      list-style: none;
  }

  .runButton {
    float: right;
    box-sizing: border-box;
    appearance: none;
    background-color: transparent;
    border: 2px solid rgb(68, 68, 68);
    border-radius: 0.6em;
    color: rgb(68, 68, 68);
    cursor: pointer;
    display: flex;
    align-self: center;
    font-size: 3vh;
    font-weight: 400;
    line-height: 1;
    margin: 1vh;
    padding: 0.7em 1.4em;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Fredoka One', cursive;
    font-weight: 700;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  }
  
  .runButton:hover,
  .runButton:focus {
    color: #fff;
    outline: 0;
    box-shadow: 0 0 40px 40px rgb(68, 68, 68) inset;
  }

  .clear {
    clear: both;
  }
</style>