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

@media (max-width: 991px) {
  #credentials {
    padding: 20px;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: PannoTextMedium, sans-serif;
}

h1,
h2 {
  color: #1e64c8;
}

h1 {
  font-size: 50px;
}

h2 {
  font-size: 20px;
}

h3 {
  font-size: 19px;
}

#app {
  font-family: 'PannoTextLight', Arial, sans-serif;
  font-size: 17px;
  color: #333333;
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
