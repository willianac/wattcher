import { Button, InputNumber } from "antd"
import { useState } from "react"
import { useUserStore } from "../../store/user"
import React from "react"

type ComponentProps = {
  changeValues: (value: number, endpoint: string) => Promise<void>
  setBoxVisibility : React.Dispatch<React.SetStateAction<boolean>>
}

function ChangeValuesBox({ changeValues, setBoxVisibility }: ComponentProps) {
  const { user } = useUserStore()

  const [kwhInputValue, setKwhInputValue] = useState(user.local_kwh)
  const [taxesInputValue, setTaxesInputValue] = useState(user.taxes)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = async() => {
    setIsLoading(true)
    const kwh = changeValues(kwhInputValue, "changekwh")
    const taxes = changeValues(taxesInputValue, "changetaxes")

    await Promise.allSettled([kwh, taxes])
    setIsLoading(false)
    setBoxVisibility(false)
  }

  return (
    <div className="flex flex-col bg-grayPrimary p-3 rounded-lg tracking-tighter">
      <div className="flex gap-1 mb-2 items-center w-6/12 justify-between lg:w-full lg:justify-normal">
        <span>kWh:</span>
        <InputNumber value={kwhInputValue} onChange={(val) => setKwhInputValue(val ?? 0)} prefix="R$"/>
      </div>
      <div className="flex gap-1 items-center w-6/12 justify-between lg:w-full lg:justify-normal">
        <span>Impostos:</span>
        <InputNumber value={taxesInputValue} onChange={(val) => setTaxesInputValue(val ?? 0)} prefix="R$"/>
      </div>
      <Button type="primary" className="mt-6" onClick={handleChange} loading={isLoading}>Salvar</Button>
    </div>
  )
}
export default ChangeValuesBox