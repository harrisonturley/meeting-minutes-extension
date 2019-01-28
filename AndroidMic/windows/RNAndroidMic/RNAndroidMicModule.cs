using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Android.Mic.RNAndroidMic
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNAndroidMicModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNAndroidMicModule"/>.
        /// </summary>
        internal RNAndroidMicModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNAndroidMic";
            }
        }
    }
}
