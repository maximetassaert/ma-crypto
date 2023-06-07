```

<template>
  <ion-header>
    <ion-label>
        {{ $route.params.id}}
    </ion-label>
  </ion-header>

  <div id="container">
      <ion-item>
        <ion-label>
            {{ coin.name}}
        </ion-label>
      </ion-item>
  </div>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonSearchbar, IonButton } from "@ionic/vue";
import coinService from "@/services/coinService";
import { defineProps, onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
const route = useRoute();
const cryptoId = route.params.id

defineProps({
  name: String,
});

const coin: any = ref({});
onMounted(async () => {
  const coin = await coinService.getCoinDetail(cryptoId);
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