import { CommonComponentProps } from '../../interface'
import { useMaterialDrop } from '../../hooks/useMaterialDrop'

function Page({ id, name, children }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialDrop(['Button', 'Container'], id)

  return (
    <div
      ref={drop}
      data-component-id={id}
      style={{ border: canDrop ? '2px solid blue' : '2px solid transparent' }}
      className="p-[20px] h-[100%] box-border"
    >
      {children}
    </div>
  )
}

export default Page
