import ApiClient from '../src/api/client'

const apiClient = new ApiClient({
  token: import.meta.env.VITE_DADATA_TOKEN,
})

const input = document.querySelector<HTMLInputElement>('#query')
const list = document.querySelector('#suggestions')
const radioGroup = document.querySelector('#radio-group')
const apiOptions = [
  {
    label: 'Организация',
    fn: (query: string) => apiClient.suggestOrganization(query),
  },
  {
    label: 'Банк',
    fn: (query: string) => apiClient.suggestBank(query),
  },
  {
    label: 'Адрес',
    fn: (query: string) => apiClient.suggestAddress(query),
  },
]
const suggest = async (query: string) => {
  const value = document.querySelector<HTMLInputElement>('input[name="api"]:checked')?.value
  if (value) {
    const apiMethod = apiOptions.find((x) => x.label === value)?.fn
    return apiMethod?.(query)
  }
  return
}

async function displaySuggestions(query: string) {
  const suggestions = (await suggest(query)) ?? []
  if (list) {
    list.innerHTML = ''
    suggestions.forEach((element) => {
      const li = document.createElement('li')
      const pre = document.createElement('pre')
      li.appendChild(pre)
      pre.textContent = JSON.stringify(element, null, 2)
      list.appendChild(li)
    })
  }
}

input?.addEventListener('input', () => {
  displaySuggestions(input.value).catch((e) => {
    console.error(e)
  })
})

function buildRadioGroup() {
  if (radioGroup) {
    radioGroup.innerHTML = ''
    apiOptions.forEach((opt, index) => {
      const label = document.createElement('label')
      const input = document.createElement('input')
      input.setAttribute('type', 'radio')
      input.setAttribute('name', 'api')
      input.setAttribute('value', opt.label)
      if (index === 0) {
        input.setAttribute('checked', '')
      }

      label.setAttribute('style', 'cursor:pointer')
      label.appendChild(input)
      label.appendChild(document.createTextNode(opt.label))
      radioGroup.appendChild(label)
    })
  }
}

buildRadioGroup()
