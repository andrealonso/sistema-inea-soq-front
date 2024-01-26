<template>
  <v-app>
    <v-navigation-drawer expand-on-hover class="d-print-none" v-model="drawer" :mini-variant="true" :clipped="clipped"
      app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact color="success">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app elevation="1" color="success" class="d-print-none">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>

        <span> INEA - Sistema de Ordem de queima</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon> mdi-account-circle</v-icon>
          </v-btn>
          <div>{{ nomeUser + ' - ' + nivelUser }}</div>
        </template>
        <v-card min-width="150">
          <v-card-text class="text-center">
            <v-btn text small @click="editarPerfil"> Editar perfil</v-btn>
            <v-btn text small @click="logout"> Sair</v-btn>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid class="d-print-none">
        <Nuxt />
        <!-- <pre>{{ $store.state.user }}</pre> -->
        <perfilCadastro v-if="exibCadastro" :open="exibCadastro" @close="exibCadastro = false" @cancelar="cancelar"
          @atualizarListagem="atualizarListagem" @exibSnack="exibSnack" :isEdit="isEdit" :item="payload" />
        <snackbar v-if="snack.active" :snack="snack" @close="snack.active = false" />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import Vue, { onMounted } from 'vue';
import { usuarioModel } from '~/models/UsuarioModel'
const eventBus = new Vue()

// $('input[type=number]').on('mousewheel', function(e) {
//   $(e.target).blur();
// });
export default {
  name: 'DefaultLayout',

  data() {
    return {
      payload: null,

      exibCadastro: false,
      isEdit: false,
      listaMenu: [

      ],
      clipped: true,
      drawer: true,
      fixed: true,
      items: this.configMenu(),
      tipoUser: '',
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'INEA - Sistem de ordem de queima',
      snack: {
        active: false,
        text: "teste",
        timeout: 2000,
        color: "primary"
      }
    }

  },
  computed: {
    nomeUser() {
      let nome = this.$store.state.user.nome
      return nome ? nome.split(' ').slice(0, 2).join(' ') : ''
    },
    nivelUser() {
      const user_tipo = ["ADM ROOT", "ADM INEA", "ADM EMPRESA", "FISCAL INEA", "FUNCIONÁRIO"]
      let tipo_id = this.$store.state.user.user_tipo_id
      return user_tipo[tipo_id - 1]
    }
  },
  methods: {
    exibSnack(texto, cor) {
      this.snack.color = cor || ''
      this.snack.text = texto || ''
      this.snack.active = true
    },
    async atualizarListagem() {
      try {

      } catch (error) {
        this.listagem = []
        console.log({ error });
      }
    },


    cancelar() {
      this.payload = usuarioModel()
      this.exibCadastro = false
    },
    async editarPerfil() {
      const id = this.$store.state.user.user_id
      try {
        const payload = await this.$axios.$get(`/usuario/${id}`)
        this.payload = usuarioModel(payload.dados)
        this.exibCadastro = true
        this.isEdit = true
      } catch (error) {
        console.log(error);
      }
    },
    configMenu() {

      // 1 - ADM ROOT
      // 2 - ADM INEA
      // 3 - ADM EMPRESA
      // 4 - FISCAL
      // 5 - FUNCIONARIOS
      const user_tipo_id = this.$store.state.user.user_tipo_id || 0

      const lista = [
        // {
        //   icon: 'mdi-apps',
        //   title: 'Home',
        //   to: '/'
        // },
      ]


      if ([1, 3, 5].some(item => item === user_tipo_id)) {
        lista.push(
          {
            icon: 'mdi-domain',
            title: 'Propriedades',
            to: '/propriedades'
          }
        )
      }
      if ([1, 3, 5].some(item => item === user_tipo_id)) {
        lista.push(
          {
            icon: 'mdi-account-group',
            title: 'Proprietários',
            to: '/proprietarios'
          },
        )
      }
      if ([1, 3, 5].some(item => item === user_tipo_id)) {
        lista.push(
          {
            icon: 'mdi-account-multiple-outline',
            title: 'Representantes',
            to: '/representantes'
          }
        )
      }
      if ([1, 2].some(item => item === user_tipo_id)) {
        lista.push(
          {
            icon: 'mdi-factory',
            title: 'Empresas',
            to: '/empresas'
          }
        )
      }
      if ([1, 2, 3].some(item => item === user_tipo_id)) {
        lista.push(
          {
            icon: 'mdi-account-key',
            title: 'Usuarios',
            to: '/usuarios'
          }
        )
      }
      if ([1, 2, 3, 4, 5].some(item => item === user_tipo_id)) {
        lista.push(
          {
            icon: 'mdi-calendar-month',
            title: 'Agendamentos',
            to: '/agendamentos'
          }
        )
      }
      if ([1].some(item => item === user_tipo_id)) {
        lista.push(
          {
            icon: 'mdi-database-clock',
            title: 'Logs',
            to: '/logs'
          }
        )
      }
      return lista
    },
    async logout() {
      sessionStorage.removeItem('user')
      this.$router.push({ path: '/login' })
    }
  },


}
</script>
<style>
.panel-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;

}
</style>