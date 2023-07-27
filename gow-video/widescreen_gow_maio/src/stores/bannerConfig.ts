import { create } from 'zustand'

interface useBannerConfigT {
  state: useBannerConfigStates['state']
  actions: useBannerConfigActions['actions']
}

interface useBannerConfigStates {
  state: {
    type: string
    sas_creativeOriginalClickUrl: string
    sas_creativeClickUrl: string
    sas_creativeClickTarget: string
    sas_creativeUrl: string
  }
}

interface useBannerConfigActions {
  actions: {
    setBannerConfig: (bannerConfig: useBannerConfigStates['state']) => void
  }
}

export const useBannerConfig = create<useBannerConfigT>((set) => ({
  state: {
    type: 'bannerConfig',
    sas_creativeOriginalClickUrl: '[sas_creativeOriginalClickUrl]',
    sas_creativeClickUrl: '[sas_creativeClickUrl]',
    sas_creativeClickTarget: '[sas_creativeClickTarget]',
    sas_creativeUrl: '[sas_creativeUrl]'
  },
  actions: {
    setBannerConfig: (bannerConfig: useBannerConfigStates['state']) => {
      set(() => ({
        state: bannerConfig
      }))
    }
  }
}))