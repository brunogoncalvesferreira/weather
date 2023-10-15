import { Umbrella } from '@phosphor-icons/react'

export function Empty() {
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <Umbrella className="text-4xl" />
      <p className="max-w-md text-3xl text-center font-bold -tracking-wide">
        Pesquise acima a previsão do tempo da sua cidade.
      </p>
    </div>
  )
}
