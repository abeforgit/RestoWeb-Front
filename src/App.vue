<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: 'PannoTextMedium';
  src: url(assets/fonts/UGentPannoText-Medium.otf) format('otf'),
    url(assets/fonts/UGentPannoText-Medium.ttf) format('ttf'),
    url(assets/fonts/ugentpannotext-medium-web.eot) format('eot'),
    url(assets/fonts/ugentpannotext-medium-web.ttf) format('ttf'),
    url(assets/fonts/ugentpannotext-medium-web.woff) format('woff');
}

@font-face {
  font-family: PannoTextLight;
  src: url(assets/fonts/UGentPannoText-SemiLight.otf) format('otf'),
    url(assets/fonts/UGentPannoText-SemiLight.ttf) format('ttf'),
    url(assets/fonts/ugentpannotext-semilight-web.eot) format('eot'),
    url(assets/fonts/ugentpannotext-semilight-web.ttf) format('ttf'),
    url(assets/fonts/ugentpannotext-semilight-web.woff) format('woff');
}

#credentials_card {
  max-width: 500px;
  margin: 0 auto;
}

#credentials {
  padding: 40px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: PannoTextMedium, sans-serif;
  margin: 10px 0;
  font-weight: 500;
}

h1,
h2 {
  color: #1e64c8;
  text-transform: none;
  line-height: 1;
}

h1 {
  font-size: 50px;
  margin-bottom: 13px;
}

h2 {
  font-size: 20px;
}

/*ul li a,*/
/*ol li a {*/
/*border-bottom: 1px solid transparent;*/
/*}*/

/*ul li a,*/
/*ol li a {*/
/*border-bottom: 1px solid transparent;*/
/*color: #1e64c8;*/
/*text-decoration: none;*/
/*word-break: break-word;*/
/*transition: border-color 0.15s ease-in-out;*/
/*background-color: transparent;*/
/*}*/

/*ul.arrowlist li,*/
/*ol.arrowlist li {*/
/*margin-bottom: 8px;*/
/*position: relative;*/
/*}*/

/*ul {*/
/*list-style-type: none;*/
/*}*/

/*ul.arrowlist li:before {*/
/*content: '→';*/
/*font-family: 'PannoTextMedium', Arial, sans-serif;*/
/*font-size: 16px;*/
/*color: inherit;*/
/*margin-right: 6px;*/
/*position: absolute;*/
/*top: 2px;*/
/*left: -18px;*/
/*}*/

#app {
  font-family: 'PannoTextLight', Arial, sans-serif;
  font-size: 17px;
  line-height: 1.23529412;
  color: #333;
}
</style>

<script>
import Navbar from './components/Navbar';

export default {
  components: {
    Navbar,
  },
};
</script>
