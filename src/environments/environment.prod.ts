export const environment = {
  production: true,
  attributes: {
    log: {
      enabled: false,
    },
    hmr: {
      enabled: false,
    },
    banner: {
      title: "MKT",
    },
    layout_builder: {
      enabled: false,
    },
    profile_and_setting: {
      enabled: false,
    },
  },
  components: {
    auth_service: {
      enabled: false,
      storage_key_token: "ngx_key_token",
      storage_key_user: "ngx_key_user",
      fake_access_token: "",
    },
  },
  apiKey: {
    name_service: "",
  },
  host: {
    authorization: "http://localhost:8085",
  },
};
