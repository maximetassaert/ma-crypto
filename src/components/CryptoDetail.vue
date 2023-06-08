```

<template>
  <ion-header>

  </ion-header>

  <div id="container">
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <ion-item>
       
        <IonContent>
            <br>
            <IonLabel>
                <img :src="`${ coin.image?.small}`"/>

                {{ coin.name}}
                
            </IonLabel>
            <br>
            {{ coin.description?.en}}<br><br>
            <a :href="`${ websiteLink}`">WebSite</a><br><br>
            <IonLabel>
               Market price : {{ coin.market_data?.current_price?.eur?? 0 }} € ( {{ coin.market_data?.current_price?.usd ?? 0 }} $ )
            </IonLabel>
            History prices : (for last 7 days)
            <ion-item v-for="(value) in histo" :insert="true">
                <ion-label>
                    {{ value }}
                </ion-label>
            </ion-item>
            <br><br><br><br>
        </IonContent>
      </ion-item>
  </div>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonSearchbar, IonButton } from "@ionic/vue";
import coinService from "@/services/coinService";
import { defineProps, onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
const route = useRoute();
const cryptoId = route.params.id.toString()

const websiteLink =  ref("") 
const coin: any = ref({});
const histo: any = ref([]);

onMounted(async () => {
    const coinValue = coinService.getCoinDetail(cryptoId);
    const coinHisto = coinService.getCoinHisto(cryptoId);
    coin.value = await coinValue;
    histo.value = await coinHisto;
    websiteLink.value = coin.value.links?.homepage[0]?? '#'
});

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