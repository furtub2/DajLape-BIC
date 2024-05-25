<template>
  <q-page padding>
    <q-table
      :rows="offers"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[5, 10, 20]"
    >
      <template v-slot:body-cell-actions="props">
        <q-td align="right" class="q-pa-none">
          <q-btn flat round icon="edit" @click="editOffer(props.row)" />
          <q-btn flat round icon="delete" color="negative" @click="confirmDeleteOffer(props.row.id)" />
        </q-td>
      </template>
    </q-table>
    <div class="q-my-md">
      <q-btn icon="add"  color="primary" label="New Offer" @click="showCreateDialog = true" />
    </div>
    <CreateOfferDialog
      v-model:isOpen="showCreateDialog"
      :editMode="false"
      @offerSaved="fetchOffers"
    />
    <CreateOfferDialog
      v-model:isOpen="showEditDialog"
      :editMode="true"
      :offerData="selectedOffer"
      @offerSaved="fetchOffers"
    />
    <DeleteOfferDialog
      v-model:isOpen="showDeleteDialog"
      :offerId="selectedOfferId"
      @offerDeleted="fetchOffers"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import axios from 'axios';
import { useSessionStore } from 'src/store/session';
import CreateOfferDialog from '../components/CreateOfferDialog.vue';
import DeleteOfferDialog from '../components/DeleteOfferDialog.vue';
import { BaseOffer, Offer } from 'src/components/models';


const offers = ref<Offer[]>([]);
const showCreateDialog = ref(false);
const showEditDialog = ref(false);
const showDeleteDialog = ref(false);
const selectedOffer:Ref<BaseOffer|null> = ref(null);
const selectedOfferId = ref<string | null>(null);

const sessionStore = useSessionStore();

const columns = [
  { name: 'petName', required: true, label: 'Pet Name', align: 'left', field: 'petName', sortable: true },
  { name: 'age', label: 'Age', align: 'left', field: 'age', sortable: true },
  { name: 'petType', label: 'Pet Type', align: 'left', field: 'petType', sortable: true },
  { name: 'localization', label: 'Localization', align: 'left', field: 'localization', sortable: true },
  { name: 'breeds', label: 'Breeds', align: 'left', field: 'breeds', sortable: true },
  { name: 'actions', label: 'Actions', align: 'right' },
];

const fetchOffers = async () => {
  try {
    const shelterId = sessionStore.getUserId;
    const response = await axios.get(`http://localhost:5000/shelter/getShelterOffers/?shelterId=${shelterId}` ,{
      headers: {
        Authorization: `Bearer ${sessionStore.token}`,
      },
    });
    console.log(response.data)
    offers.value = response.data;
  } catch (error) {
    console.error('Error fetching offers:', error);
  }
};

const editOffer = (offer:BaseOffer) => {
  selectedOffer.value = { ...offer };
  showEditDialog.value = true;
};

const confirmDeleteOffer = (offerId:string) => {
  selectedOfferId.value = offerId;
  showDeleteDialog.value = true;
};

onMounted(fetchOffers);
</script>
