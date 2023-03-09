import {
  PaintBrushIcon,
  DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { DashboardLayout } from './DashboardLayout'

export const navigation = [
  {
    name: 'Create with Dall-E',
    href: '/portal/create/with-dalle',
    icon: PaintBrushIcon,
    current: false,
  },
  {
    name: 'Review Dall-E creations',
    href: '/portal/review/dalle',
    icon: DocumentMagnifyingGlassIcon,
    current: false,
  },
  {
    name: 'Upload',
    href: '/portal/create/with-upload',
    icon: PaintBrushIcon,
    current: false,
  },
  {
    name: 'Review Uploads',
    href: '/portal/review/uploads',
    icon: DocumentMagnifyingGlassIcon,
    current: false,
  },
  
  {
    name: 'Categorize',
    href: '/portal/review/uploads',
    icon: DocumentMagnifyingGlassIcon,
    current: false,
  },

]

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Portal() {
  return (
    <DashboardLayout pageName="wow">
      {'Lets put links to the various services in cards here'}
    </DashboardLayout>
  )
}
