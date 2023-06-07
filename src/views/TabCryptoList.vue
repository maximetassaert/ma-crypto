<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="titre">Liste des crypto</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Liste des crypto</ion-title>
        </ion-toolbar>
      </ion-header>

      <CryptoList name="Liste des crypto" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/vue';
import CryptoList from '@/components/CryptoList.vue';
</script>

<style scoped>
.titre {
  text-align: center;
}
</style>