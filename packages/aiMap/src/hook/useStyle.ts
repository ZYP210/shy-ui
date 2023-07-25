enum ThemeEnum {
  'darkblue-5' = 'aimap://styles/aimap/darkblue-v5',
  'normal-4' = 'aimap://styles/aimap/normal-v4',
  'darkblue-4' = 'aimap://styles/aimap/darkblue-v4'
}

export const useStyle = (map) => {
  const setTheme = (theme: 'darkblue-5' | 'normal-4' | 'darkblue-4') => {
    map.value.setStyle(ThemeEnum[theme])
  }
  return { setTheme }
}
