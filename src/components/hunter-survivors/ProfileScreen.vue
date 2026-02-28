<template>
  <div :class="['screen', 'profile-page', { active: active }]">
    <div class="profile-hero">
      <div class="profile-avatar">
        <img src="/ganjagod.png" alt="Ganjagod avatar" class="profile-avatar-img" />
      </div>
      <div class="profile-name">{{ profileName }}</div>
      <div class="profile-role">{{ profileTitle }} · Level 420</div>
      <button class="btn-edit-profile" @click="openEditModal">Edit Profile</button>
    </div>
    <div class="profile-stats">
      <div class="profile-stat">
        <div class="profile-stat-val">146</div>
        <div class="profile-stat-label">Achievements</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-val">731</div>
        <div class="profile-stat-label">Games Played</div>
      </div>
      <div class="profile-stat">
        <div class="profile-stat-val">365</div>
        <div class="profile-stat-label">Days Active</div>
      </div>
    </div>
    <div class="achievements-card">
      <div class="achievements-title">Achievements</div>
      <div class="achievement-badge">⚔️ Slayer of Thousands</div>
      <div class="achievement-badge">👑 Ancient Lord</div>
      <div class="achievement-badge">🔥 Master of Darkness</div>
    </div>
    <div class="section-card">
      <div class="inv-header">
        <div class="inv-title" @click="openFullInventoryModal">Inventory</div>
      </div>
      <div class="inv-grid" @click="openFullInventoryModal">
        <div v-for="(item, index) in inventory" :key="`${item}-${index}`" class="inv-slot">
          <img :src="item" alt="Inventory item" class="inv-icon" />
        </div>
      </div>
    </div>

    <div v-if="showFullInventoryModal" class="full-inv-overlay" @click.self="closeFullInventoryModal">
      <div class="full-inv-modal">
        <div class="full-inv-header">
          <div class="full-inv-title">Inventory</div>
          <button class="full-inv-close" @click="closeFullInventoryModal">✕</button>
        </div>
        <div class="full-inv-grid">
          <div v-for="(item, index) in fullInventoryItems" :key="`full-${item}-${index}`" class="full-inv-slot">
            <img :src="item" alt="Inventory item" class="full-inv-icon" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="showEditModal" class="edit-modal-overlay" @click.self="closeEditModal">
      <div class="edit-modal">
        <div class="edit-modal-header">
          <div class="edit-modal-title">Edit Profile</div>
          <button class="edit-close" @click="closeEditModal">✕</button>
        </div>

        <div class="edit-avatar-wrap">
          <div class="edit-avatar">
            <img src="/ganjagod.png" alt="Ganjagod avatar" class="edit-avatar-img" />
          </div>
          <button class="edit-avatar-btn" type="button">🖼 Change Avatar</button>
        </div>

        <div class="edit-field-label">👤 Username</div>
        <input v-model="draftName" class="edit-input" type="text" />

        <div class="edit-field-label">Select Title</div>
        <select v-model="draftTitle" class="edit-input edit-select">
          <option>Ancient Hunter</option>
          <option>Blood Reaper</option>
          <option>Night Stalker</option>
          <option>Relic Seeker</option>
        </select>

        <div class="edit-field-label">✉ Email</div>
        <input v-model="draftEmail" class="edit-input" type="email" />

        <div class="edit-actions">
          <button class="edit-btn edit-btn-cancel" @click="closeEditModal">CANCEL</button>
          <button class="edit-btn edit-btn-save" @click="saveProfile">SAVE CHANGES</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  active: boolean;
  inventory: string[];
  fullInventory?: string[];
}>();

const showEditModal = ref(false);
const showFullInventoryModal = ref(false);

const profileName = ref('Lord Ganja');
const profileTitle = ref('Ancient Hunter');
const profileEmail = ref('epsteindidntkillhimself@pro.gamer');

const draftName = ref(profileName.value);
const draftTitle = ref(profileTitle.value);
const draftEmail = ref(profileEmail.value);

const openEditModal = () => {
  draftName.value = profileName.value;
  draftTitle.value = profileTitle.value;
  draftEmail.value = profileEmail.value;
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const saveProfile = () => {
  profileName.value = draftName.value.trim() || profileName.value;
  profileTitle.value = draftTitle.value;
  profileEmail.value = draftEmail.value.trim() || profileEmail.value;
  showEditModal.value = false;
};

const fullInventoryItems = computed(() => {
  if (props.fullInventory && props.fullInventory.length > 0) {
    return props.fullInventory;
  }

  const fallback = props.inventory.length > 0 ? props.inventory : [];
  return Array.from({ length: 55 }, (_, index) => fallback[index % Math.max(fallback.length, 1)]);
});

const openFullInventoryModal = () => {
  showFullInventoryModal.value = true;
};

const closeFullInventoryModal = () => {
  showFullInventoryModal.value = false;
};
</script>

<style>
.profile-page {
  overflow-y: auto;
  padding-bottom: 60px;
}

.profile-page::-webkit-scrollbar {
  display: none;
}

.profile-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 20px;
}

.profile-avatar {
  width: 99px;
  height: 99px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b0000, #3d0000);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--red);
  margin-bottom: 12px;
  box-shadow: 0 0 30px rgba(196, 13, 13, 0.4);
  overflow: hidden;
}

.profile-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.profile-name {
  font-family: var(--font-title);
  font-size: 22px;
  color: white;
}

.profile-role {
  font-size: 14px;
  color: #888;
  margin-top: 4px;
}

.btn-edit-profile {
  margin-top: 12px;
  border: 1px solid #a82020;
  border-radius: 20px;
  background: transparent;
  color: white;
  font-family: var(--font-body);
  font-size: 14px;
  padding: 6px 22px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-edit-profile:hover {
  background: rgba(196, 13, 13, 0.2);
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 2px 16px 6px;
}

.profile-stat {
  background: #070404;
  border: 1px solid #5a1111;
  border-radius: 10px;
  text-align: center;
  padding: 12px 0 10px;
}

.profile-stat:nth-child(1) {
  border-color: #8f7e2a;
}

.profile-stat:nth-child(2) {
  border-color: #7d1414;
}

.profile-stat:nth-child(3) {
  border-color: #142f7d;
}

.profile-stat-val {
  font-family: var(--font-title);
  font-size: 42px;
  line-height: 1;
}

.profile-stat:nth-child(1) .profile-stat-val {
  color: #d8b948;
}

.profile-stat:nth-child(2) .profile-stat-val {
  color: #ff4a4a;
}

.profile-stat:nth-child(3) .profile-stat-val {
  color: #667dff;
}

.profile-stat-label {
  font-size: 13px;
  margin-top: 2px;
}

.profile-stat:nth-child(1) .profile-stat-label {
  color: #bba24a;
}

.profile-stat:nth-child(2) .profile-stat-label {
  color: #d14f4f;
}

.profile-stat:nth-child(3) .profile-stat-label {
  color: #5e73dd;
}

.achievements-card {
  margin: 16px 20px;
  border: 1px solid #6a1515;
  border-radius: 10px;
  padding: 14px 16px;
}

.achievements-title {
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}

.achievement-badge {
  background: #0e0a0a;
  border: 1px solid #3d1212;
  border-radius: 6px;
  padding: 8px 14px;
  margin-bottom: 6px;
  font-size: 14px;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-card {
  margin: 0 20px 16px;
  border-radius: 12px;
  border: 1px solid #6a1515;
  padding: 14px 16px;
}

.inv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.inv-title {
  font-size: 22px;
  color: white;
  cursor: pointer;
}

.inv-grid {
  display: grid;
  grid-template-columns: repeat(5, 60px);
  gap: 6px;
}

.inv-slot {
  width: 60px;
  height: 60px;
  border: 1px solid #b31a1a;
  border-radius: 4px;
  background: radial-gradient(circle, rgba(94, 7, 7, 0.185) 0%, rgba(189, 15, 15, 0.37) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.inv-icon {
  width: 78%;
  height: 78%;
  object-fit: contain;
  filter: drop-shadow(0 0 6px rgba(255, 170, 130, 0.2));
  pointer-events: none;
}

.inv-slot:hover {
  border-color: var(--red);
  background: rgba(189, 15, 15, 0.4);
}

.full-inv-overlay {
  position: fixed;
  inset: 0;
  z-index: 55;
  background: rgba(0, 0, 0, 0.78);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 14px 10px;
}

.full-inv-modal {
  width: min(100%, 430px);
  border: 1px solid #5d1111;
  background: #050505;
  padding: 10px 10px 12px;
  max-height: calc(100vh - 28px);
  overflow-y: auto;
}

.full-inv-modal::-webkit-scrollbar {
  display: none;
}

.full-inv-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.full-inv-title {
  font-family: var(--font-title);
  color: #f0e4de;
  font-size: 18px;
}

.full-inv-close {
  border: none;
  background: transparent;
  color: #ff1f1f;
  font-size: 36px;
  line-height: 1;
  cursor: pointer;
}

.full-inv-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
}

.full-inv-slot {
  aspect-ratio: 1 / 1;
  border: 1px solid #a61010;
  background: radial-gradient(circle at 50% 44%, rgba(255, 52, 52, 0.34) 0%, rgba(84, 0, 0, 0.72) 56%, rgba(36, 0, 0, 0.98) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.full-inv-icon {
  width: 78%;
  height: 78%;
  object-fit: contain;
  filter: drop-shadow(0 0 6px rgba(255, 170, 130, 0.2));
  pointer-events: none;
}

.edit-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 16px;
}

.edit-modal {
  width: min(100%, 430px);
  background: linear-gradient(180deg, rgba(90, 8, 8, 0.94) 0%, rgba(10, 3, 3, 0.98) 62%);
  border: 1px solid #8a1414;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 38px rgba(0, 0, 0, 0.6);
}

.edit-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 10px;
  border-bottom: 1px solid #6f1414;
}

.edit-modal-title {
  font-family: var(--font-title);
  font-size: 40px;
  color: #f1d9d9;
}

.edit-close {
  border: none;
  background: transparent;
  color: #ff1f1f;
  font-size: 34px;
  line-height: 1;
  cursor: pointer;
}

.edit-avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 20px 8px;
}

.edit-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 1px solid #741212;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 35%, rgba(140, 20, 20, 0.8), rgba(40, 5, 5, 0.95));
  overflow: hidden;
}

.edit-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.edit-avatar-btn {
  background: transparent;
  border: none;
  color: #ff6969;
  font-size: 16px;
  font-family: var(--font-title);
  cursor: pointer;
}

.edit-field-label {
  margin: 10px 20px 6px;
  color: #ff6969;
  font-size: 18px;
  font-family: var(--font-title);
}

.edit-input {
  width: calc(100% - 40px);
  margin: 0 20px;
  height: 44px;
  border-radius: 6px;
  border: 1px solid #7a1111;
  background: #070202;
  color: #f3e7e7;
  font-size: 20px;
  font-family: var(--font-title);
  padding: 0 12px;
}

.edit-select {
  appearance: none;
}

.edit-actions {
  display: flex;
  gap: 14px;
  padding: 18px 20px 20px;
}

.edit-btn {
  height: 44px;
  border-radius: 6px;
  font-family: var(--font-title);
  font-size: 16px;
  cursor: pointer;
}

.edit-btn-cancel {
  width: 44%;
  border: 1px solid #a82727;
  background: transparent;
  color: #ffd3d3;
}

.edit-btn-save {
  width: 56%;
  border: none;
  background: linear-gradient(90deg, #d10000, #a10000);
  color: #fff;
}
</style>
