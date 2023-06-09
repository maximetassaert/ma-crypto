```

<template>
  <ion-header>

  </ion-header>
      <ion-item>
       
        <IonContent>
            <br>
            <div class="image-crypto">
              <IonLabel>
                  <img :src="`${ coin.image?.small}`"/>
                  {{ coin.name}}
                  
              </IonLabel>
            </div>
            <br>
            <p class="description" :innerHTML="`${ coin.description?.en }`"></p><br><br>
            <p>Lien vers le site : <a :href="`${ websiteLink}`">Clique ici</a><br><br></p>
            <IonLabel>
               <p class="price">Market price : {{ coin.market_data?.current_price?.eur?? 0 }} € ( {{ coin.market_data?.current_price?.usd ?? 0 }} $ )</p>
            </IonLabel>
            <p class="history">History prices : (for last 7 days)</p>
            <ion-item class="ancien-price" v-for="(value) in histo" :insert="true">
                <ion-label>
                    {{ value }}
                </ion-label>
            </ion-item>
            <br><br><br><br>
        </IonContent>
      </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonSearchbar, IonButton } from "@ionic/vue";
import coinService from "@/services/coinService";
import { onMounted, ref } from "vue";
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

ion-item .price {
  text-align: center;
  font-size: 18px;
}

ion-item .ancien-price {
  text-align: center;
}

.lien {
  text-decoration: none;
}

.image-crypto {
  padding: 20px;
  margin: auto;
  text-align: center;
}

.description {
  width: 90%;
  margin: auto;
  line-height: 20px;
}

.history {
  text-align: center;
  margin: 15px 0;
  font-size: 18px;
}

</style>