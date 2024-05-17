import { defineStore } from "pinia"
interface State {
  isActive: boolean;
  message: string;
  typeAlert: any;
  timeout?: number;
}
export const useAlertStore = defineStore('alert', {
  state: (): State => ({
    isActive: false,
    message: 'alert de prueba',
    typeAlert: {
      error: {
        selected: false,
        class: 'text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800',
        classIcon: 'bg-red-50 text-red-500 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
      },
      success: {
        selected: false,
        class: 'text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800',
        classIcon: 'bg-green-50 text-green-500 focus:ring-green-400 p-1.5 hover:bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700'
      },
    },
    timeout: 5000,
  }),
  actions: {
    async toggleAlert(payload: State) {
      this.$reset()
      this.isActive = payload.isActive
      this.message = payload.message
      this.typeAlert[payload.typeAlert].selected = true
      setTimeout(() => {
        this.$reset()
      }, payload.timeout)
    },
    async handleAlert(alert: State) {
      this.toggleAlert(alert)
    },
    hideAlert() {
      this.$reset()
    }
  },
})