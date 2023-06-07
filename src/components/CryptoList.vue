```
<template>
  <ion-header>
    <ion-toolbar>
      <ion-searchbar
        :debounce="1000"
        @ionInput="handleInput($event)"
      ></ion-searchbar>
    </ion-toolbar>
  </ion-header>

  <div id="container">
    <ion-list>
      <ion-item v-for="(coin, index) in coinsList[paginate]" :key="index" :insert="true">
        <ion-label>
          <a class="lien" :href="`./crypto/${coin.id}`">{{ coin.name}}</a>
        </ion-label>
      </ion-item>
    </ion-list>
    <div class="buttonPaginate">
      <ion-button @click="decrementPaginate">Precedent</ion-button>
      <ion-button @click="incrementPaginate">Suivant</ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonSearchbar, IonButton } from "@ionic/vue";
import coinService from "@/services/coinService";
import { defineProps, onMounted, ref } from "vue";

defineProps({
  name: String,
});

const coinsList: any = ref([]);
const paginate: any = ref(0);
let coinsListName: any = [];
let data: any = []
let Temp: any = null;

const decrementPaginate = () => {
  if (paginate.value > 0) {
    Temp = coinsList.value[paginate.value];
    paginate.value--;
  }
};

const incrementPaginate = () => {
  if (paginate.value < coinsList.value.length - 1) {
    Temp = coinsList.value[paginate.value];
    paginate.value++;
  }
};

onMounted(async () => {
  const { chunkedCoinsList: chunks, coinsList: list } = await coinService.getCoinsList();
  coinsList.value = chunks;
  coinsListName = chunks.map((item) => item.name);
  data = list.map((item) => ({name: item.name, id: item.id}));
  Temp = coinsList.value[paginate.value];
});

function handleInput(event: any) {
  

  const query = event.target.value.toLowerCase();

  if(query.length === 0){
    coinsList.value[paginate.value] = Temp;
  } else {
    coinsList.value[paginate.value] = data.filter((d: any) => d.name.toLowerCase().indexOf(query) > -1);
  }
}

</script>

<style scoped>

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.buttonPaginate {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  margin-top: 20px;
  bottom: 0;
}

ion-item {
  border-radius: 10px;
}

.lien {
  text-decoration: none;
}
</style>
```