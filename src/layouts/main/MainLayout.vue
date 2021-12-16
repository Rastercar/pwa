<script lang="ts">
import {
  LogoutMutationDocument,
  UserByIdQueryDocument,
} from 'src/graphql/generated/graphql-operations';
import SidebarContent from './SidebarContent.vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    SidebarContent,
  },

  setup() {
    const isDrawerOpen = ref(true);

    const toggleDrawer = () => {
      isDrawerOpen.value = !isDrawerOpen.value;
    };

    const { mutate: logout } = useMutation(LogoutMutationDocument);

    const { result: user, refetch } = useQuery(UserByIdQueryDocument, {
      id: 1,
    });

    // const { client } = useApolloClient();

    // client.cache.modify({
    //   id: client.cache.identify({
    //     __typename: 'UserModel',
    //     id: '1',
    //     email: 'uzm0ol@gmail.com',
    //     username: 'admin_user',
    //     emailVerified: false,
    //   }),
    //   fields: {
    //     username(us: string) {
    //       console.log('xd', us);
    //       return 'xxxxxxxxxxxxxxxxxxxx';
    //     },
    //   },
    // });

    function changeUser() {
      console.log('fetching');
      refetch({ id: 1 })?.catch(console.log);
    }

    return { isDrawerOpen, toggleDrawer, user, changeUser, logout };
  },
});
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer v-model="isDrawerOpen" behavior="desktop" side="left" bordered>
      <SidebarContent />
    </q-drawer>

    <q-page-container>
      <div>
        <span>CONTENT USER</span>
        {{ user }}

        <hr />

        <button @click="changeUser">CHANGE USER</button>
        <button @click="logout">LOGOUT</button>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
