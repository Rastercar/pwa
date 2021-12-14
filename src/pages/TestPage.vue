<script lang="ts">
import { LOGIN_MUTATION } from '../graphql/auth/auth.mutations';
import { useMutation } from '@vue/apollo-composable';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TestPage',

  setup() {
    const { mutate: login } = useMutation(LOGIN_MUTATION, {
      variables: {
        input: { email: 'admin.user@gmail.com', password: '12345' },
      },
    });

    login().then(console.log).catch(console.error);

    return {};
  },
});
</script>

<template>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
    exercitationem cum placeat quo molestias iusto voluptatum aliquam vel
    tenetur autem adipisci et impedit hic eligendi inventore magni recusandae
    praesentium cupiditate?
  </div>
</template>
