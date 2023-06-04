import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider'
import clsx from 'clsx'

type CompareSliderProps = typeof ReactCompareSlider & {
  original: string
  restored: string
  classNames?: string
}

const CompareSlider = ({
  original,
  restored,
  classNames,
  ...props
}: CompareSliderProps) => (
  <ReactCompareSlider
    itemOne={<ReactCompareSliderImage src={original} alt="Original Image" />}
    itemTwo={<ReactCompareSliderImage src={restored} alt="Restored Image" />}
    className={clsx('mb-10', classNames)}
    {...props}
  />
)

export default CompareSlider
