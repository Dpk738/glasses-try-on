// Behavior.js
// Version: 0.3.0
// Event: Lens Initialized
// Description: Configure a trigger and response in the inspector UI. No scripting required.
//
// ---- LOCAL API USAGE ----
// Manually trigger this Behavior
//  script.api.trigger();
//
// Add a callback function to call when this Behavior is triggered
//  script.api.addTriggerResponse(callback)
//
// Remove a callback function from this Behavior
//  script.api.removeTriggerResponse(callback)
//
// ---- GLOBAL API USAGE ----
// Manually send a global custom trigger
//  global.behaviorSystem.sendCustomTrigger(triggerName)
//
// Add a callback function to call when the global custom trigger named "triggerName" is sent
//  global.behaviorSystem.addCustomTriggerResponse(triggerName, callback)
//
// Remove a callback function for the global custom trigger named "triggerName"
//  global.behaviorSystem.removeCustomTriggerResponse(triggerName, callback)
// -----------------

//@input string triggeringEventType = "TouchEvent" {"widget": "combobox", "values": [{"value": "TouchEvent", "label": "Touch Event"}, {"value": "FaceEvent", "label": "Face Event"}, {"value": "OnAwake", "label": "On Awake"}, {"value": "TurnOnEvent", "label": "On Start"}, {"value": "UpdateEvent", "label": "Update"}, {"value": "LateUpdateEvent", "label": "Late Update"}, {"value": "CameraFrontEvent", "label": "Front Camera"}, {"value": "CameraBackEvent", "label": "Back Camera"}, {"value": "InteractionEvent", "label": "Interaction Event"}, {"value": "animationEnd", "label": "Animation End"}, {"value": "tweenEnd", "label": "Tween End"}, {"value": "lookingAt", "label": "Looking At"}, {"value": "distanceCheck", "label": "Distance Check"}, {"value": "markerTrackingEvent", "label": "Marker Tracking Event"}, {"value": "objectTrackingEvent", "label": "Object Tracking Event"}, {"value": "landmarkerEvent", "label": "Landmarker Event"}, {"value": "machineLearningEvent", "label": "Machine Learning Event"}, {"value": "recordingStart", "label": "Recording Start"}, {"value": "onCustomTrigger", "label": "On Custom Trigger"}, {"value": "None", "label": "None"}], "label": "Trigger"}
//@input string touchEventEventType = "TapEvent" {"showIf": "triggeringEventType", "showIfValue": "TouchEvent", "values": [{"value": "TapEvent", "label": "Tap"}, {"value": "TouchStartEvent", "label": "Touch Start"}, {"value": "TouchMoveEvent", "label": "Touch Move"}, {"value": "TouchEndEvent", "label": "Touch End"}], "widget": "combobox", "label": "Event Type"}
//@input Component.BaseMeshVisual touchEventTouchTarget {"showIf": "triggeringEventType", "showIfValue": "TouchEvent", "label": "Touch Target"}

//@input string faceEventEventType = "MouthOpenedEvent" {"showIf": "triggeringEventType", "showIfValue": "FaceEvent", "values": [{"value": "MouthOpenedEvent", "label": "Mouth Opened"}, {"value": "MouthClosedEvent", "label": "Mouth Closed"}, {"value": "BrowsRaisedEvent", "label": "Brows Raised"}, {"value": "BrowsLoweredEvent", "label": "Brows Lowered"}, {"value": "BrowsReturnedToNormalEvent", "label": "Brows Returned to Normal"}, {"value": "FaceFoundEvent", "label": "Face Found"}, {"value": "FaceLostEvent", "label": "Face Lost"}, {"value": "KissStartedEvent", "label": "Kiss Started"}, {"value": "KissFinishedEvent", "label": "Kiss Finished"}, {"value": "SmileStartedEvent", "label": "Smile Started"}, {"value": "SmileFinishedEvent", "label": "Smile Finished"}], "widget": "combobox", "label": "Event Type"}
//@input int faceEventFaceIndex {"showIf": "triggeringEventType", "showIfValue": "FaceEvent", "label": "Face Index"}

//@input string interactionEventEventType = "onTap" {"showIf": "triggeringEventType", "showIfValue": "InteractionEvent", "values": [{"value": "onTap", "label": "Tap"}, {"value": "onTouchStart", "label": "Touch Start"}, {"value": "onTouchMove", "label": "Touch Move"}, {"value": "onTouchEnd", "label": "Touch End"}, {"value": "onFocusStart", "label": "Focus Start"}, {"value": "onFocusEnd", "label": "Focus End"}, {"value": "onSelectStart", "label": "Select Start"}, {"value": "onSelectEnd", "label": "Select End"}, {"value": "onTriggerPrimary", "label": "Trigger Primary"}], "widget": "combobox", "label": "Event Type"}
//@input Component.BaseMeshVisual interactionEventTarget {"showIf": "triggeringEventType", "showIfValue": "InteractionEvent", "label": "Target"}

//@input string animType = "Animated Texture" {"showIf": "triggeringEventType", "showIfValue": "animationEnd", "values": [{"value": "Animated Texture", "label": "Animated Texture"}, {"value": "Image Visual", "label": "Image Visual"}, {"value": "Animation Mixer", "label": "Animation Mixer"}], "widget": "combobox"}

//@ui {"showIf": "triggeringEventType", "showIfValue": "animationEnd", "widget": "group_start", "label": "Target"}
//@input Asset.Texture animationEndAnimatedTexture {"showIf": "animType", "showIfValue": "Animated Texture", "label": "Animated Texture"}
//@input Component.MaterialMeshVisual animationEndImageVisual {"showIf": "animType", "showIfValue": "Image Visual", "label": "Image Visual"}
//@ui {"showIf": "animType", "showIfValue": "Sprite Visual", "widget": "label", "label": "<font color='orange'>WARNING:</font>"}
//@ui {"showIf": "animType", "showIfValue": "Sprite Visual", "widget": "label", "label": "Sprite Visual is Deprecated."}
//@ui {"showIf": "animType", "showIfValue": "Sprite Visual", "widget": "label", "label": "Please use Image Visual instead."}

//@input Component.AnimationMixer animationEndAnimMixer {"showIf": "animType", "showIfValue": "Animation Mixer", "label": "Anim Mixer"}
//@input string animationEndAnimLayerName {"showIf": "animType", "showIfValue": "Animation Mixer", "label": "Anim Layer Name"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "animationEnd", "widget": "group_end"}

//@input SceneObject tweenEndTargetObject {"showIf": "triggeringEventType", "showIfValue": "tweenEnd", "label": "Target Object"}
//@input string tweenEndTweenName {"showIf": "triggeringEventType", "showIfValue": "tweenEnd", "label": "Tween Name"}

//@input SceneObject lookingAtLookingObject {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Looking Object"}
//@input SceneObject lookingAtLookTarget {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Look Target"}
//@input bool lookingAtFlipForwardVec = true {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Flip Forward Vec"}
//@input int lookingAtCompareType = -1 {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "values": [{"value": -1, "label": "Is Less Than"}, {"value": 0, "label": "Is Equal To"}, {"value": 1, "label": "Is Greater Than"}], "widget": "combobox", "label": "Compare Type"}

//@input float lookingAtAngle = 10.0 {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Angle"}
//@input bool lookingAtAllowRepeat {"showIf": "triggeringEventType", "showIfValue": "lookingAt", "label": "Allow Repeat"}

//@input SceneObject distanceCheckObjectA {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Object A"}
//@input SceneObject distanceCheckObjectB {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Object B"}
//@input int distanceCheckCompareType = -1 {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "values": [{"value": -1, "label": "Is Less Than"}, {"value": 0, "label": "Is Equal To"}, {"value": 1, "label": "Is Greater Than"}], "widget": "combobox", "label": "Compare Type"}

//@input float distanceCheckDistance = 1.0 {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Distance"}
//@input bool distanceCheckAllowRepeat {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Allow Repeat"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "widget": "group_start", "label": "ScreenTransform Settings"}
//@input bool distanceCheckFlattenZForScreenTransforms = true {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "label": "Flatten Z Distance"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "distanceCheck", "widget": "group_end"}

//@input string markerTrackingEventEventType = "Marker Found" {"showIf": "triggeringEventType", "showIfValue": "markerTrackingEvent", "values": [{"value": "Marker Found", "label": "Marker Found"}, {"value": "Marker Lost", "label": "Marker Lost"}], "widget": "combobox", "label": "Event Type"}

//@input Component.MarkerTrackingComponent markerTrackingEventMarkerTracking {"showIf": "triggeringEventType", "showIfValue": "markerTrackingEvent", "label": "Marker Tracking"}

//@ui {"showIf": "triggeringEventType", "showIfValue": "objectTrackingEvent", "widget": "group_start", "label": "Tracking Settings"}
//@input string objectTrackingEventEventType = "Object Found" {"showIf": "triggeringEventType", "showIfValue": "objectTrackingEvent", "values": [{"value": "Object Found", "label": "Object Found"}, {"value": "Object Lost", "label": "Object Lost"}, {"value": "Descriptor Start", "label": "Descriptor Start"}, {"value": "Descriptor End", "label": "Descriptor End"}], "widget": "combobox", "label": "Event Type"}

//@input Component.ObjectTracking objectTrackingEventObjectTracking {"showIf": "triggeringEventType", "showIfValue": "objectTrackingEvent", "label": "Object Tracking"}
//@input string objectTrackingEventDescStartKey {"showIf": "objectTrackingEventEventType", "showIfValue": "Descriptor Start", "label": "Descriptor"}
//@input string objectTrackingEventDescEndKey {"showIf": "objectTrackingEventEventType", "showIfValue": "Descriptor End", "label": "Descriptor"}
//@ui {"showIf": "triggeringEventType", "showIfValue": "objectTrackingEvent", "widget": "group_end"}

//@input string landmarkerEventEventType = "Location Found" {"showIf": "triggeringEventType", "showIfValue": "landmarkerEvent", "values": [{"value": "Location Found", "label": "Location Found"}, {"value": "Location Lost", "label": "Location Lost"}], "widget": "combobox", "label": "Event Type"}

//@input Component.DeviceLocationTrackingComponent landmarkerEventLocationTracking {"showIf": "triggeringEventType", "showIfValue": "landmarkerEvent", "label": "Location Tracking"}

//@input string machineLearningEventEventType = "Loading Finished" {"showIf": "triggeringEventType", "showIfValue": "machineLearningEvent", "values": [{"value": "Loading Finished", "label": "Loading Finished"}, {"value": "Running Finished", "label": "Running Finished"}], "widget": "combobox", "label": "Event Type"}

//@input Component.MLComponent machineLearningEventMlComponent {"showIf": "triggeringEventType", "showIfValue": "machineLearningEvent", "label": "ML Component"}

//@ui {"showIf": "triggeringEventType", "showIfValue": "onCustomTrigger", "widget": "group_start", "label": "Custom Trigger"}
//@input string onCustomTriggerTriggerName {"showIf": "onCustomTriggerUseList", "showIfValue": false, "label": "Trigger Name"}
//@input string[] onCustomTriggerTriggerNames {"showIf": "onCustomTriggerUseList", "showIfValue": true, "label": "Trigger Names"}
//@input bool onCustomTriggerUseList {"showIf": "triggeringEventType", "showIfValue": "onCustomTrigger", "label": "Use List"}

//@ui {"showIf": "triggeringEventType", "showIfValue": "onCustomTrigger", "widget": "group_end"}

//@ui {"widget": "group_start", "label": "Options"}
//@input string triggerLimitType = "Always" {"widget": "combobox", "values": [{"value": "Always", "label": "Always"}, {"value": "Once", "label": "Once"}, {"value": "Interval", "label": "After Interval"}], "label": "Allow"}
//@input float triggerInterval = 1.0 {"showIf": "triggerLimitType", "showIfValue": "Interval", "label": "Interval Time"}
//@input float triggerDelay {"label": "Delay Time"}
//@ui {"widget": "group_end"}
//@ui {"widget": "separator"}
//@input string responseType = "None" {"widget": "combobox", "values": [{"value": "None", "label": "None"}, {"value": "textureAnimation", "label": "Animate Image"}, {"value": "animateMesh", "label": "Animate Mesh"}, {"value": "playSound", "label": "Play Sound"}, {"value": "playVideo", "label": "Play Video"}, {"value": "setEnabled", "label": "Set Enabled"}, {"value": "setColor", "label": "Set Color"}, {"value": "setTexture", "label": "Set Texture"}, {"value": "setText", "label": "Set Text"}, {"value": "runTween", "label": "Run Tween"}, {"value": "setPosition", "label": "Set Position"}, {"value": "setRotation", "label": "Set Rotation"}, {"value": "setScale", "label": "Set Scale"}, {"value": "setScreenPosition", "label": "Set Screen Position"}, {"value": "setScreenRotation", "label": "Set Screen Rotation"}, {"value": "setScreenSize", "label": "Set Screen Size"}, {"value": "setBlendshapes", "label": "Set Blendshapes"}, {"value": "setMaterialParameter", "label": "Set Material/VFX Parameter"}, {"value": "setTouchBlocking", "label": "Set Touch Blocking"}, {"value": "showHint", "label": "Show Hint"}, {"value": "machineLearning", "label": "Machine Learning"}, {"value": "instantiatePrefab", "label": "Instantiate Prefab"}, {"value": "destroyObject", "label": "Destroy Object"}, {"value": "printMessage", "label": "Print Message"}, {"value": "callScriptAPI", "label": "Call Script API"}, {"value": "sendCustomTrigger", "label": "Send Custom Trigger"}]}
//@ui {"showIf": "responseType", "showIfValue": "textureAnimation", "widget": "group_start", "label": "Target"}
//@input Asset.Texture animateImageAnimatedTexture {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Animated Texture"}
//@input Component.MaterialMeshVisual animateImageVisualObject {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Visual Object"}
//@ui {"showIf": "responseType", "showIfValue": "textureAnimation", "widget": "group_end"}
//@input string animateImageAction = "Play or Resume" {"showIf": "responseType", "showIfValue": "textureAnimation", "values": [{"value": "Play", "label": "Play"}, {"value": "Play or Resume", "label": "Play or Resume"}, {"value": "Pause", "label": "Pause"}, {"value": "Pause at Frame", "label": "Pause at Frame"}, {"value": "Toggle", "label": "Toggle Play/Pause"}, {"value": "Stop", "label": "Stop"}], "widget": "combobox", "label": "Action"}

//@ui {"showIf": "responseType", "showIfValue": "textureAnimation", "widget": "group_start", "label": "Options"}
//@input bool animateImageLoop {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Loop"}
//@input int animateImagePauseFrame {"showIf": "animateImageAction", "showIfValue": "Pause at Frame", "label": "Pause Frame"}
//@input bool animateImageAdvanced {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Advanced"}
//@ui {"showIf": "animateImageAdvanced", "showIfValue": true, "widget": "group_start", "label": "Warning: This will modify Texture settings!"}
//@input bool animateImagePingPong {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Ping Pong"}
//@input bool animateImageReverse {"showIf": "responseType", "showIfValue": "textureAnimation", "label": "Reverse"}
//@ui {"showIf": "responseType", "showIfValue": "textureAnimation", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "textureAnimation", "widget": "group_end"}

//@input Component.AnimationMixer animateMeshAnimationMixer {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Animation Mixer"}
//@ui {"showIf": "responseType", "showIfValue": "animateMesh", "widget": "group_start", "label": "Options"}
//@input string animateMeshLayerName {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Layer Name"}
//@input string animateMeshAction = "Play or Resume" {"showIf": "responseType", "showIfValue": "animateMesh", "values": [{"value": "Play", "label": "Play"}, {"value": "Play or Resume", "label": "Play or Resume"}, {"value": "Pause", "label": "Pause"}, {"value": "Stop", "label": "Stop"}], "widget": "combobox", "label": "Action"}

//@input float animateMeshWeight = 1.0 {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Weight"}
//@input bool animateMeshLoop {"showIf": "responseType", "showIfValue": "animateMesh", "label": "Loop"}
//@input bool animateMeshStopOtherLayers = true {"showIf": "responseType", "showIfValue": "animateMesh", "hint": "Stops all other Layers, and sets their weights to 0.", "label": "Stop Other Layers"}
//@ui {"showIf": "animateMeshStopOtherLayers", "showIfValue": true, "widget": "label", "label": "Note: Other layer weights will be set to 0."}
//@ui {"showIf": "responseType", "showIfValue": "animateMesh", "widget": "group_end"}

//@input string playSoundAction = "Play" {"showIf": "responseType", "showIfValue": "playSound", "values": [{"value": "Play", "label": "Play"}, {"value": "Stop", "label": "Stop"}], "widget": "combobox", "label": "Action"}

//@ui {"showIf": "responseType", "showIfValue": "playSound", "widget": "group_start", "label": "Target"}
//@input Asset.AudioTrackAsset playSoundAudioTrack {"showIf": "playSoundAction", "showIfValue": "Play", "label": "Audio Track"}
//@input Component.AudioComponent playSoundAudioComponent {"showIf": "responseType", "showIfValue": "playSound", "label": "Audio Component"}
//@ui {"showIf": "responseType", "showIfValue": "playSound", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "playSound", "widget": "group_start", "label": "Options"}
//@input bool playSoundLoop {"showIf": "playSoundAction", "showIfValue": "Play", "label": "Loop"}
//@input float playSoundVolume = 1.0 {"showIf": "playSoundAction", "widget": "slider", "min": 0.0, "max": 1.0, "showIfValue": "Play", "label": "Volume", "step": 0.05}
//@input bool playSoundFadeOut {"showIf": "playSoundAction", "showIfValue": "Stop", "label": "Fade Out"}
//@ui {"showIf": "responseType", "showIfValue": "playSound", "widget": "group_end"}

//@ui {"showIf": "responseType", "showIfValue": "playVideo", "widget": "group_start", "label": "Target"}
//@input Asset.Texture playVideoVideoTexture {"showIf": "responseType", "showIfValue": "playVideo", "label": "Video Texture"}
//@input Component.MaterialMeshVisual playVideoVisualObject {"showIf": "responseType", "showIfValue": "playVideo", "label": "Visual Object"}
//@ui {"showIf": "responseType", "showIfValue": "playVideo", "widget": "group_end"}
//@input string playVideoAction = "Play or Resume" {"showIf": "responseType", "showIfValue": "playVideo", "values": [{"value": "Play", "label": "Play"}, {"value": "Play or Resume", "label": "Play or Resume"}, {"value": "Pause", "label": "Pause"}, {"value": "Toggle", "label": "Toggle Play/Pause"}, {"value": "Stop", "label": "Stop"}], "widget": "combobox", "label": "Action"}

//@input bool playVideoLoop {"showIf": "responseType", "showIfValue": "playVideo", "label": "Loop"}

//@input SceneObject setEnabledTarget {"showIf": "responseType", "showIfValue": "setEnabled", "label": "Target"}
//@input string setEnabledAction = "Enable" {"showIf": "responseType", "showIfValue": "setEnabled", "values": [{"value": "Enable", "label": "Enable"}, {"value": "Disable", "label": "Disable"}, {"value": "Toggle", "label": "Toggle"}], "widget": "combobox", "label": "Action"}

//@ui {"showIf": "responseType", "showIfValue": "setColor", "widget": "group_start", "label": "Target"}
//@input Component.MaterialMeshVisual setColorVisual {"showIf": "responseType", "showIfValue": "setColor", "label": "Visual"}
//@input Asset.Material setColorMaterial {"showIf": "responseType", "showIfValue": "setColor", "label": "Material"}
//@ui {"showIf": "responseType", "showIfValue": "setColor", "widget": "group_end"}
//@input vec4 setColorColor = "{1,1,1,1}" {"showIf": "responseType", "showIfValue": "setColor", "widget": "color", "label": "Color"}

//@input Component.MaterialMeshVisual setTextureTarget {"showIf": "responseType", "showIfValue": "setTexture", "label": "Target"}
//@input Asset.Texture setTextureNewTexture {"showIf": "responseType", "showIfValue": "setTexture", "label": "New Texture"}

//@input Component.Text setTextTextComponent {"showIf": "responseType", "showIfValue": "setText", "label": "Text Component"}
//@input string setTextText {"showIf": "responseType", "showIfValue": "setText", "label": "Text"}

//@input SceneObject runTweenTargetObject {"showIf": "responseType", "showIfValue": "runTween", "label": "Target Object"}
//@input string runTweenTweenName {"showIf": "responseType", "showIfValue": "runTween", "label": "Tween Name"}
//@input string runTweenAction = "Start" {"showIf": "responseType", "showIfValue": "runTween", "values": [{"value": "Start", "label": "Start"}, {"value": "Stop", "label": "Stop"}, {"value": "Pause", "label": "Pause"}, {"value": "Resume", "label": "Resume"}], "widget": "combobox", "label": "Action"}

//@input SceneObject setPositionObjectToMove {"showIf": "responseType", "showIfValue": "setPosition", "label": "Object to Move"}
//@input vec3 setPositionPosition {"showIf": "responseType", "showIfValue": "setPosition", "label": "Position"}
//@input bool setPositionLocalSpace = true {"showIf": "responseType", "showIfValue": "setPosition", "label": "Local Space"}

//@input SceneObject setRotationObjectToRotate {"showIf": "responseType", "showIfValue": "setRotation", "label": "Object to Rotate"}
//@input vec3 setRotationRotationAngle {"showIf": "responseType", "showIfValue": "setRotation", "label": "Euler Rotation"}
//@input bool setRotationLocalSpace = true {"showIf": "responseType", "showIfValue": "setRotation", "label": "Local Space"}

//@input SceneObject setScaleObjectToScale {"showIf": "responseType", "showIfValue": "setScale", "label": "Object to Scale"}
//@input vec3 setScaleScale {"showIf": "responseType", "showIfValue": "setScale", "label": "Scale"}
//@input bool setScaleLocalSpace = true {"showIf": "responseType", "showIfValue": "setScale", "label": "Local Space"}

//@input Component.ScreenTransform setScreenPositionScreenTransform {"showIf": "responseType", "showIfValue": "setScreenPosition", "label": "Screen Transform"}
//@ui {"showIf": "responseType", "showIfValue": "setScreenPosition", "widget": "group_start", "label": "Options"}
//@input string setScreenPositionPositionType = "Basic Position" {"showIf": "responseType", "showIfValue": "setScreenPosition", "values": [{"value": "Basic Position", "label": "Basic Position"}, {"value": "Anchors Rect", "label": "Anchors Rect"}, {"value": "Offsets Rect", "label": "Offsets Rect"}], "widget": "combobox", "label": "Position Type"}

//@input vec3 setScreenPositionBasicPosition {"showIf": "setScreenPositionPositionType", "showIfValue": "Basic Position", "label": "Basic Position"}
//@input vec2 setScreenPositionAnchorsCenter {"showIf": "setScreenPositionPositionType", "showIfValue": "Anchors Rect", "label": "Anchors Center"}
//@input vec2 setScreenPositionOffsetsCenter {"showIf": "setScreenPositionPositionType", "showIfValue": "Offsets Rect", "label": "Offsets Center"}
//@ui {"showIf": "responseType", "showIfValue": "setScreenPosition", "widget": "group_end"}

//@input Component.ScreenTransform setScreenRotationScreenTransform {"showIf": "responseType", "showIfValue": "setScreenRotation", "label": "Screen Transform"}
//@input float setScreenRotationAngle {"showIf": "responseType", "showIfValue": "setScreenRotation", "label": "Angle"}

//@input Component.ScreenTransform setScreenSizeScreenTransform {"showIf": "responseType", "showIfValue": "setScreenSize", "label": "Screen Transform"}
//@ui {"showIf": "responseType", "showIfValue": "setScreenSize", "widget": "group_start", "label": "Options"}
//@input string setScreenSizeSizeType = "Basic Scale" {"showIf": "responseType", "showIfValue": "setScreenSize", "values": [{"value": "Basic Scale", "label": "Basic Scale"}, {"value": "Anchors Rect", "label": "Anchors Rect"}, {"value": "Offsets Rect", "label": "Offsets Rect"}], "widget": "combobox", "label": "Size Type"}

//@input vec3 setScreenSizeBasicScale {"showIf": "setScreenSizeSizeType", "showIfValue": "Basic Scale", "label": "Basic Scale"}
//@input vec2 setScreenSizeAnchorsSize {"showIf": "setScreenSizeSizeType", "showIfValue": "Anchors Rect", "label": "Anchors Size"}
//@input vec2 setScreenSizeOffsetsSize {"showIf": "setScreenSizeSizeType", "showIfValue": "Offsets Rect", "label": "Offsets Size"}
//@ui {"showIf": "responseType", "showIfValue": "setScreenSize", "widget": "group_end"}

//@input Component.BlendShapes setBlendshapesBlendshapes {"showIf": "responseType", "showIfValue": "setBlendshapes", "label": "Blendshapes"}
//@input string setBlendshapesName {"showIf": "responseType", "showIfValue": "setBlendshapes", "label": "Name"}
//@input float setBlendshapesWeight = 0 {"showIf": "responseType", "showIfValue": "setBlendshapes", "label": "Weight"}

//@ui {"showIf": "responseType", "showIfValue": "setMaterialParameter", "widget": "group_start", "label": "Target"}
//@input string setMaterialParameterTargetType = "Material" {"showIf": "responseType", "showIfValue": "setMaterialParameter", "values": [{"value": "Material", "label": "Material"}, {"value": "MeshVisual", "label": "MeshVisual"}, {"value": "VFX Asset", "label": "VFX Asset"}, {"value": "VFX Component", "label": "VFX Component"}], "widget": "combobox", "label": "Target Type"}

//@input Asset.Material setMaterialParameterMaterial {"showIf": "setMaterialParameterTargetType", "showIfValue": "Material", "label": "Material"}
//@input Component.MaterialMeshVisual setMaterialParameterMeshVisual {"showIf": "setMaterialParameterTargetType", "showIfValue": "MeshVisual", "label": "Mesh Visual"}
//@input Asset.VFXAsset setMaterialParameterVFXAsset {"showIf": "setMaterialParameterTargetType", "showIfValue": "VFX Asset", "label": "VFX Asset"}
//@input Component.VFXComponent setMaterialParameterVFXComponent {"showIf": "setMaterialParameterTargetType", "showIfValue": "VFX Component", "label": "VFX Component"}
//@input string setMaterialParameterParameterName {"showIf": "responseType", "showIfValue": "setMaterialParameter", "label": "Parameter Name"}
//@ui {"showIf": "responseType", "showIfValue": "setMaterialParameter", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "setMaterialParameter", "widget": "group_start", "label": "Value"}
//@input string setMaterialParameterValueType = "float" {"showIf": "responseType", "showIfValue": "setMaterialParameter", "values": [{"value": "bool", "label": "bool"}, {"value": "int", "label": "int"}, {"value": "float", "label": "float"}, {"value": "Color (RGB)", "label": "Color (RGB)"}, {"value": "Color (RGBA)", "label": "Color (RGBA)"}, {"value": "Texture", "label": "Texture"}, {"value": "vec2", "label": "vec2"}, {"value": "vec3", "label": "vec3"}, {"value": "vec4", "label": "vec4"}], "widget": "combobox", "label": "Value Type"}

//@input bool setMaterialParameterBoolValue {"showIf": "setMaterialParameterValueType", "showIfValue": "bool", "label": "Bool Value"}
//@input int setMaterialParameterIntValue {"showIf": "setMaterialParameterValueType", "showIfValue": "int", "label": "Int Value"}
//@input float setMaterialParameterFloatValue {"showIf": "setMaterialParameterValueType", "showIfValue": "float", "label": "Float Value"}
//@input vec3 setMaterialParameterColorRGBValue {"showIf": "setMaterialParameterValueType", "showIfValue": "Color (RGB)", "widget": "color", "label": "Color ( R G B) Value"}
//@input vec4 setMaterialParameterColorRGBAValue {"showIf": "setMaterialParameterValueType", "showIfValue": "Color (RGBA)", "widget": "color", "label": "Color ( R G B A) Value"}
//@input Asset.Texture setMaterialParameterTextureValue {"showIf": "setMaterialParameterValueType", "showIfValue": "Texture", "label": "Texture Value"}
//@input vec2 setMaterialParameterVec2Value {"showIf": "setMaterialParameterValueType", "showIfValue": "vec2", "label": "Vec2 Value"}
//@input vec3 setMaterialParameterVec3Value {"showIf": "setMaterialParameterValueType", "showIfValue": "vec3", "label": "Vec3 Value"}
//@input vec4 setMaterialParameterVec4Value {"showIf": "setMaterialParameterValueType", "showIfValue": "vec4", "label": "Vec4 Value"}
//@ui {"showIf": "responseType", "showIfValue": "setMaterialParameter", "widget": "group_end"}

//@ui {"showIf": "responseType", "showIfValue": "setTouchBlocking", "widget": "group_start", "label": "Target"}
//@input string setTouchBlockingTargetType = "Global Touches" {"showIf": "responseType", "showIfValue": "setTouchBlocking", "values": [{"value": "Global Touches", "label": "Global Touches"}, {"value": "Touch Component", "label": "Touch Component"}], "widget": "combobox", "label": "Target Type"}

//@input bool setTouchBlockingGlobalTouchBlocking = true {"showIf": "setTouchBlockingTargetType", "showIfValue": "Global Touches", "label": "Global Touch Blocking"}
//@input Component.TouchComponent setTouchBlockingTouchComponent {"showIf": "setTouchBlockingTargetType", "showIfValue": "Touch Component", "label": "Touch Component"}
//@ui {"showIf": "responseType", "showIfValue": "setTouchBlocking", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "setTouchBlocking", "widget": "group_start", "label": "Touch Blocking Exceptions"}
//@input bool setTouchBlockingTouchTypeTouch {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Touch"}
//@input bool setTouchBlockingTouchTypeTap {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Tap"}
//@input bool setTouchBlockingTouchTypeDoubleTap {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "DoubleTap"}
//@input bool setTouchBlockingTouchTypeScale {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Scale"}
//@input bool setTouchBlockingTouchTypePan {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Pan"}
//@input bool setTouchBlockingTouchTypeSwipe {"showIf": "responseType", "showIfValue": "setTouchBlocking", "label": "Swipe"}
//@ui {"showIf": "responseType", "showIfValue": "setTouchBlocking", "widget": "group_end"}

//@input int showHintHint = 0 {"showIf": "responseType", "showIfValue": "showHint", "values": [{"value": 0, "label": "Aim camera at the sky"}, {"value": 1, "label": "Blow a kiss"}, {"value": 2, "label": "Blow a kiss voice changer"}, {"value": 3, "label": "Come closer"}, {"value": 4, "label": "Do not smile"}, {"value": 5, "label": "Do not try with a friend"}, {"value": 6, "label": "Draw with your finger"}, {"value": 7, "label": "Find face"}, {"value": 8, "label": "Find image"}, {"value": 9, "label": "Find marker"}, {"value": 10, "label": "Find snapcode"}, {"value": 11, "label": "Kiss"}, {"value": 12, "label": "Kiss again"}, {"value": 13, "label": "Look around"}, {"value": 14, "label": "Look down"}, {"value": 15, "label": "Look left"}, {"value": 16, "label": "Look right"}, {"value": 17, "label": "Look up"}, {"value": 18, "label": "Make some noise!"}, {"value": 19, "label": "Move your head"}, {"value": 20, "label": "Nod your head"}, {"value": 21, "label": "Now kiss"}, {"value": 22, "label": "Now open your mouth"}, {"value": 23, "label": "Now raise your eyebrows"}, {"value": 24, "label": "Now smile"}, {"value": 25, "label": "Open your mouth"}, {"value": 26, "label": "Open your mouth again"}, {"value": 27, "label": "Open your mouth voice changer"}, {"value": 28, "label": "Pick a face"}, {"value": 29, "label": "Pick a photo"}, {"value": 30, "label": "Pick an image"}, {"value": 31, "label": "Raise your eyebrows"}, {"value": 32, "label": "Raise your eyebrows again"}, {"value": 33, "label": "Raise your eyebrows or open your mouth"}, {"value": 34, "label": "Raise your eyebrows voice changer"}, {"value": 35, "label": "Rotate your phone"}, {"value": 36, "label": "Say something"}, {"value": 37, "label": "Smile"}, {"value": 38, "label": "Smile again"}, {"value": 39, "label": "Smile voice changer"}, {"value": 40, "label": "Swap camera"}, {"value": 41, "label": "Tap a surface"}, {"value": 42, "label": "Tap ground to place"}, {"value": 43, "label": "Tap surface to place"}, {"value": 44, "label": "Tap the ground"}, {"value": 45, "label": "Tap!"}, {"value": 46, "label": "Tilt your head"}, {"value": 47, "label": "Try it with a friend"}, {"value": 48, "label": "Try it with your rear camera"}, {"value": 49, "label": "Turn around"}, {"value": 50, "label": "Voice changer"}, {"value": 51, "label": "Walk through the door"}], "widget": "combobox", "label": "Hint"}
//@input float showHintDuration = 2.0 {"showIf": "responseType", "showIfValue": "showHint", "label": "Duration"}

//@input Component.MLComponent runMLMlComponent {"showIf": "responseType", "showIfValue": "machineLearning", "label": "ML Component"}
//@input string runMLAction = "Run Immediate" {"showIf": "responseType", "showIfValue": "machineLearning", "values": [{"value": "Build", "label": "Build"}, {"value": "Run Immediate", "label": "Run Immediate"}, {"value": "Run Scheduled", "label": "Run Scheduled"}, {"value": "Cancel", "label": "Cancel"}, {"value": "Stop", "label": "Stop"}], "widget": "combobox", "label": "Action"}

//@ui {"showIf": "responseType", "showIfValue": "machineLearning", "widget": "group_start", "label": "Options"}
//@input bool runMLSync {"showIf": "runMLAction", "showIfValue": "Run Immediate", "label": "Sync"}
//@input bool runMLRecurring {"showIf": "runMLAction", "showIfValue": "Run Scheduled", "label": "Recurring"}
//@input int runMLStartTiming = 2 {"showIf": "runMLAction", "showIfValue": "Run Scheduled", "values": [{"value": 1, "label": "None"}, {"value": 2, "label": "Update"}, {"value": 3, "label": "Late Update"}, {"value": 4, "label": "On Render"}], "widget": "combobox", "label": "Start Timing"}
//@input int runMLEndTiming = 4 {"showIf": "runMLAction", "showIfValue": "Run Scheduled", "values": [{"value": 1, "label": "None"}, {"value": 2, "label": "Update"}, {"value": 3, "label": "Late Update"}, {"value": 4, "label": "On Render"}], "widget": "combobox", "label": "End Timing"}
//@ui {"showIf": "responseType", "showIfValue": "machineLearning", "widget": "group_end"}

//@input Asset.ObjectPrefab instantiatePrefabPrefab {"showIf": "responseType", "showIfValue": "instantiatePrefab", "label": "Prefab"}
//@input SceneObject instantiatePrefabParent {"showIf": "responseType", "showIfValue": "instantiatePrefab", "label": "Parent"}

//@input SceneObject destroyObjectObject {"showIf": "responseType", "showIfValue": "destroyObject", "label": "Object"}

//@input string printMessageText {"showIf": "responseType", "showIfValue": "printMessage", "label": "Message"}

//@ui {"showIf": "responseType", "showIfValue": "callScriptAPI", "widget": "group_start", "label": "Target"}
//@input Component.ScriptComponent callScriptAPIScriptComponent {"showIf": "responseType", "showIfValue": "callScriptAPI", "label": "Script Component"}
//@input int callScriptAPICallType = 0 {"showIf": "responseType", "showIfValue": "callScriptAPI", "values": [{"value": 0, "label": "Call Function"}, {"value": 1, "label": "Set Property"}], "widget": "combobox", "label": "Call Type"}

//@ui {"showIf": "responseType", "showIfValue": "callScriptAPI", "widget": "group_end"}
//@ui {"showIf": "responseType", "showIfValue": "callScriptAPI", "widget": "group_start", "label": "Settings"}
//@input string callScriptAPIFunctionName {"showIf": "callScriptAPICallType", "showIfValue": 0, "label": "Function Name"}
//@input string callScriptAPIPropertyName {"showIf": "callScriptAPICallType", "showIfValue": 1, "label": "Property Name"}
//@ui {"showIf": "callScriptAPICallType", "showIfValue": 0, "widget": "group_start", "label": "Argument 1"}
//@input string callScriptAPI_arg1ValueType = "None" {"showIf": "callScriptAPICallType", "showIfValue": 0, "values": [{"value": "None", "label": "None"}, {"value": "bool", "label": "bool"}, {"value": "int", "label": "int"}, {"value": "float", "label": "float"}, {"value": "string", "label": "string"}, {"value": "Color (RGB)", "label": "Color (RGB)"}, {"value": "Color (RGBA)", "label": "Color (RGBA)"}, {"value": "vec2", "label": "vec2"}, {"value": "vec3", "label": "vec3"}, {"value": "vec4", "label": "vec4"}, {"value": "SceneObject", "label": "SceneObject"}, {"value": "Asset", "label": "Asset"}, {"value": "Texture", "label": "Texture"}, {"value": "Component", "label": "Component"}, {"value": "bool Array", "label": "bool Array"}, {"value": "int Array", "label": "int Array"}, {"value": "float Array", "label": "float Array"}, {"value": "string Array", "label": "string Array"}, {"value": "vec2 Array", "label": "vec2 Array"}, {"value": "vec3 Array", "label": "vec3 Array"}, {"value": "vec4 Array", "label": "vec4 Array"}, {"value": "SceneObject Array", "label": "SceneObject Array"}, {"value": "Asset Array", "label": "Asset Array"}, {"value": "Texture Array", "label": "Texture Array"}, {"value": "Component Array", "label": "Component Array"}], "widget": "combobox", "label": "Value Type"}

//@input bool callScriptAPI_arg1BoolValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "bool", "label": "Bool Value"}
//@input int callScriptAPI_arg1IntValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "int", "label": "Int Value"}
//@input float callScriptAPI_arg1FloatValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "float", "label": "Float Value"}
//@input string callScriptAPI_arg1StringValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "string", "label": "String Value"}
//@input vec3 callScriptAPI_arg1ColorRGBValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Color (RGB)", "widget": "color", "label": "Color ( R G B) Value"}
//@input vec4 callScriptAPI_arg1ColorRGBAValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Color (RGBA)", "widget": "color", "label": "Color ( R G B A) Value"}
//@input vec2 callScriptAPI_arg1Vec2Value {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec2", "label": "Vec2 Value"}
//@input vec3 callScriptAPI_arg1Vec3Value {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec3", "label": "Vec3 Value"}
//@input vec4 callScriptAPI_arg1Vec4Value {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec4", "label": "Vec4 Value"}
//@input SceneObject callScriptAPI_arg1SceneObjectValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "SceneObject", "label": "Scene Object Value"}
//@input Asset callScriptAPI_arg1AssetValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Asset", "label": "Asset Value"}
//@input Asset.Texture callScriptAPI_arg1TextureValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Texture", "label": "Texture Value"}
//@input Component callScriptAPI_arg1ComponentValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Component", "label": "Component Value"}
//@input bool[] callScriptAPI_arg1BoolArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "bool Array", "label": "Bool Array Value"}
//@input int[] callScriptAPI_arg1IntArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "int Array", "label": "Int Array Value"}
//@input float[] callScriptAPI_arg1FloatArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "float Array", "label": "Float Array Value"}
//@input string[] callScriptAPI_arg1StringArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "string Array", "label": "String Array Value"}
//@input vec2[] callScriptAPI_arg1Vec2ArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec2 Array", "label": "Vec2 Array Value"}
//@input vec3[] callScriptAPI_arg1Vec3ArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec3 Array", "label": "Vec3 Array Value"}
//@input vec4[] callScriptAPI_arg1Vec4ArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "vec4 Array", "label": "Vec4 Array Value"}
//@input SceneObject[] callScriptAPI_arg1SceneObjectArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "SceneObject Array", "label": "Scene Object Array Value"}
//@input Asset[] callScriptAPI_arg1AssetArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Asset Array", "label": "Asset Array Value"}
//@input Asset.Texture[] callScriptAPI_arg1TextureArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Texture Array", "label": "Texture Array Value"}
//@input Component[] callScriptAPI_arg1ComponentArrayValue {"showIf": "callScriptAPI_arg1ValueType", "showIfValue": "Component Array", "label": "Component Array Value"}
//@ui {"showIf": "callScriptAPICallType", "showIfValue": 0, "widget": "group_end"}

//@ui {"showIf": "callScriptAPICallType", "showIfValue": 0, "widget": "group_start", "label": "Argument 2"}
//@input string callScriptAPI_arg2ValueType = "None" {"showIf": "callScriptAPICallType", "showIfValue": 0, "values": [{"value": "None", "label": "None"}, {"value": "bool", "label": "bool"}, {"value": "int", "label": "int"}, {"value": "float", "label": "float"}, {"value": "string", "label": "string"}, {"value": "Color (RGB)", "label": "Color (RGB)"}, {"value": "Color (RGBA)", "label": "Color (RGBA)"}, {"value": "vec2", "label": "vec2"}, {"value": "vec3", "label": "vec3"}, {"value": "vec4", "label": "vec4"}, {"value": "SceneObject", "label": "SceneObject"}, {"value": "Asset", "label": "Asset"}, {"value": "Texture", "label": "Texture"}, {"value": "Component", "label": "Component"}, {"value": "bool Array", "label": "bool Array"}, {"value": "int Array", "label": "int Array"}, {"value": "float Array", "label": "float Array"}, {"value": "string Array", "label": "string Array"}, {"value": "vec2 Array", "label": "vec2 Array"}, {"value": "vec3 Array", "label": "vec3 Array"}, {"value": "vec4 Array", "label": "vec4 Array"}, {"value": "SceneObject Array", "label": "SceneObject Array"}, {"value": "Asset Array", "label": "Asset Array"}, {"value": "Texture Array", "label": "Texture Array"}, {"value": "Component Array", "label": "Component Array"}], "widget": "combobox", "label": "Value Type"}

//@input bool callScriptAPI_arg2BoolValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "bool", "label": "Bool Value"}
//@input int callScriptAPI_arg2IntValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "int", "label": "Int Value"}
//@input float callScriptAPI_arg2FloatValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "float", "label": "Float Value"}
//@input string callScriptAPI_arg2StringValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "string", "label": "String Value"}
//@input vec3 callScriptAPI_arg2ColorRGBValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Color (RGB)", "widget": "color", "label": "Color ( R G B) Value"}
//@input vec4 callScriptAPI_arg2ColorRGBAValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Color (RGBA)", "widget": "color", "label": "Color ( R G B A) Value"}
//@input vec2 callScriptAPI_arg2Vec2Value {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec2", "label": "Vec2 Value"}
//@input vec3 callScriptAPI_arg2Vec3Value {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec3", "label": "Vec3 Value"}
//@input vec4 callScriptAPI_arg2Vec4Value {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec4", "label": "Vec4 Value"}
//@input SceneObject callScriptAPI_arg2SceneObjectValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "SceneObject", "label": "Scene Object Value"}
//@input Asset callScriptAPI_arg2AssetValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Asset", "label": "Asset Value"}
//@input Asset.Texture callScriptAPI_arg2TextureValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Texture", "label": "Texture Value"}
//@input Component callScriptAPI_arg2ComponentValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Component", "label": "Component Value"}
//@input bool[] callScriptAPI_arg2BoolArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "bool Array", "label": "Bool Array Value"}
//@input int[] callScriptAPI_arg2IntArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "int Array", "label": "Int Array Value"}
//@input float[] callScriptAPI_arg2FloatArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "float Array", "label": "Float Array Value"}
//@input string[] callScriptAPI_arg2StringArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "string Array", "label": "String Array Value"}
//@input vec2[] callScriptAPI_arg2Vec2ArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec2 Array", "label": "Vec2 Array Value"}
//@input vec3[] callScriptAPI_arg2Vec3ArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec3 Array", "label": "Vec3 Array Value"}
//@input vec4[] callScriptAPI_arg2Vec4ArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "vec4 Array", "label": "Vec4 Array Value"}
//@input SceneObject[] callScriptAPI_arg2SceneObjectArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "SceneObject Array", "label": "Scene Object Array Value"}
//@input Asset[] callScriptAPI_arg2AssetArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Asset Array", "label": "Asset Array Value"}
//@input Asset.Texture[] callScriptAPI_arg2TextureArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Texture Array", "label": "Texture Array Value"}
//@input Component[] callScriptAPI_arg2ComponentArrayValue {"showIf": "callScriptAPI_arg2ValueType", "showIfValue": "Component Array", "label": "Component Array Value"}
//@ui {"showIf": "callScriptAPICallType", "showIfValue": 0, "widget": "group_end"}

//@ui {"showIf": "callScriptAPICallType", "showIfValue": 1, "widget": "group_start", "label": "Value"}
//@input string callScriptAPI_valueValueType = "float" {"showIf": "callScriptAPICallType", "showIfValue": 1, "values": [{"value": "None", "label": "None"}, {"value": "bool", "label": "bool"}, {"value": "int", "label": "int"}, {"value": "float", "label": "float"}, {"value": "string", "label": "string"}, {"value": "Color (RGB)", "label": "Color (RGB)"}, {"value": "Color (RGBA)", "label": "Color (RGBA)"}, {"value": "vec2", "label": "vec2"}, {"value": "vec3", "label": "vec3"}, {"value": "vec4", "label": "vec4"}, {"value": "SceneObject", "label": "SceneObject"}, {"value": "Asset", "label": "Asset"}, {"value": "Texture", "label": "Texture"}, {"value": "Component", "label": "Component"}, {"value": "bool Array", "label": "bool Array"}, {"value": "int Array", "label": "int Array"}, {"value": "float Array", "label": "float Array"}, {"value": "string Array", "label": "string Array"}, {"value": "vec2 Array", "label": "vec2 Array"}, {"value": "vec3 Array", "label": "vec3 Array"}, {"value": "vec4 Array", "label": "vec4 Array"}, {"value": "SceneObject Array", "label": "SceneObject Array"}, {"value": "Asset Array", "label": "Asset Array"}, {"value": "Texture Array", "label": "Texture Array"}, {"value": "Component Array", "label": "Component Array"}], "widget": "combobox", "label": "Value Type"}

//@input bool callScriptAPI_valueBoolValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "bool", "label": "Bool Value"}
//@input int callScriptAPI_valueIntValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "int", "label": "Int Value"}
//@input float callScriptAPI_valueFloatValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "float", "label": "Float Value"}
//@input string callScriptAPI_valueStringValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "string", "label": "String Value"}
//@input vec3 callScriptAPI_valueColorRGBValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Color (RGB)", "widget": "color", "label": "Color ( R G B) Value"}
//@input vec4 callScriptAPI_valueColorRGBAValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Color (RGBA)", "widget": "color", "label": "Color ( R G B A) Value"}
//@input vec2 callScriptAPI_valueVec2Value {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec2", "label": "Vec2 Value"}
//@input vec3 callScriptAPI_valueVec3Value {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec3", "label": "Vec3 Value"}
//@input vec4 callScriptAPI_valueVec4Value {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec4", "label": "Vec4 Value"}
//@input SceneObject callScriptAPI_valueSceneObjectValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "SceneObject", "label": "Scene Object Value"}
//@input Asset callScriptAPI_valueAssetValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Asset", "label": "Asset Value"}
//@input Asset.Texture callScriptAPI_valueTextureValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Texture", "label": "Texture Value"}
//@input Component callScriptAPI_valueComponentValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Component", "label": "Component Value"}
//@input bool[] callScriptAPI_valueBoolArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "bool Array", "label": "Bool Array Value"}
//@input int[] callScriptAPI_valueIntArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "int Array", "label": "Int Array Value"}
//@input float[] callScriptAPI_valueFloatArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "float Array", "label": "Float Array Value"}
//@input string[] callScriptAPI_valueStringArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "string Array", "label": "String Array Value"}
//@input vec2[] callScriptAPI_valueVec2ArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec2 Array", "label": "Vec2 Array Value"}
//@input vec3[] callScriptAPI_valueVec3ArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec3 Array", "label": "Vec3 Array Value"}
//@input vec4[] callScriptAPI_valueVec4ArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "vec4 Array", "label": "Vec4 Array Value"}
//@input SceneObject[] callScriptAPI_valueSceneObjectArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "SceneObject Array", "label": "Scene Object Array Value"}
//@input Asset[] callScriptAPI_valueAssetArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Asset Array", "label": "Asset Array Value"}
//@input Asset.Texture[] callScriptAPI_valueTextureArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Texture Array", "label": "Texture Array Value"}
//@input Component[] callScriptAPI_valueComponentArrayValue {"showIf": "callScriptAPI_valueValueType", "showIfValue": "Component Array", "label": "Component Array Value"}
//@ui {"showIf": "callScriptAPICallType", "showIfValue": 1, "widget": "group_end"}

//@ui {"showIf": "responseType", "showIfValue": "callScriptAPI", "widget": "group_end"}

//@ui {"showIf": "responseType", "showIfValue": "sendCustomTrigger", "widget": "group_start", "label": "Options"}
//@input string sendCustomTriggerTriggerName {"showIf": "sendCustomTriggerUseList", "showIfValue": false, "label": "Trigger Name"}
//@input string[] sendCustomTriggerTriggerNames {"showIf": "sendCustomTriggerUseList", "showIfValue": true, "label": "Trigger Names"}
//@input bool sendCustomTriggerUseList {"showIf": "responseType", "showIfValue": "sendCustomTrigger", "label": "Next In List"}

//@input bool sendCustomTriggerLoopAfterEnd = true {"showIf": "sendCustomTriggerUseList", "showIfValue": true, "label": "Loop After End"}
//@ui {"showIf": "responseType", "showIfValue": "sendCustomTrigger", "widget": "group_end"}

//@ui {"showIf": "responseType", "showIfValue": "animateSprite", "widget": "label", "label": "<font color='orange'>WARNING:</font>"}
//@ui {"showIf": "responseType", "showIfValue": "animateSprite", "widget": "label", "label": "Animate Sprite is Deprecated."}
//@ui {"showIf": "responseType", "showIfValue": "animateSprite", "widget": "label", "label": "Please use Animate Image instead."}

//@ui {"showIf": "responseType", "showIfValue": "setBillboardPosition", "widget": "label", "label": "<font color='orange'>WARNING:</font>"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardPosition", "widget": "label", "label": "Set Billboard Position is Deprecated."}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardPosition", "widget": "label", "label": "Please use Set Screen Position instead."}

//@ui {"showIf": "responseType", "showIfValue": "setBillboardRotation", "widget": "label", "label": "<font color='orange'>WARNING:</font>"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardRotation", "widget": "label", "label": "Set Billboard Rotation is Deprecated."}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardRotation", "widget": "label", "label": "Please use Set Screen Rotation instead."}

//@ui {"showIf": "responseType", "showIfValue": "setBillboardSize", "widget": "label", "label": "<font color='orange'>WARNING:</font>"}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardSize", "widget": "label", "label": "Set Billboard Size is Deprecated."}
//@ui {"showIf": "responseType", "showIfValue": "setBillboardSize", "widget": "label", "label": "Please use Set Screen Size instead."}

if (!global.scBehaviorSystem) {
    global.scBehaviorSystem = {};
    var globalTriggerSystem = (function() {
        var listeners = {};

        function getListeners(key) {
            return setDefault(listeners, key, []);
        }
        return {
            addListener: function(key, callback) {
                getListeners(key).push(callback);
            },
            removeListener: function(key, callback) {
                if (!removeFromArray(getListeners(key), callback)) {
                    debugPrint("Failed to remove listener");
                }
            },
            sendMessage: function(key) {
                getListeners(key).forEach(safeCall);
            },
        };
    })();
    global.scBehaviorSystem.addCustomTriggerResponse = globalTriggerSystem.addListener;
    global.scBehaviorSystem.removeCustomTriggerResponse = globalTriggerSystem.removeListener;
    global.scBehaviorSystem.sendCustomTrigger = globalTriggerSystem.sendMessage;
}
if (!global.behaviorSystem) {
    global.behaviorSystem = global.scBehaviorSystem;
}
var lastTriggerTime;
var localTriggerResponses = [];
var resetUpdateChecks = [];
var comparisonFuncs = {
    "-2": function(sign) {
        return sign !== 1;
    },
    "-1": function(sign) {
        return sign === -1;
    },
    "0": function(sign) {
        return sign === 0;
    },
    "3": function(sign) {
        return sign !== 0;
    },
    "1": function(sign) {
        return sign === 1;
    },
    "2": function(sign) {
        return sign !== -1;
    },
};

function getSign(x) {
    return (Math.abs(x) < .000001) ? 0 : (x > 0 ? 1 : -1);
}

function setDefault(obj, key, def) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = def;
        return def;
    }
    return obj[key];
}

function removeFromArray(array, element) {
    var index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
        return true;
    }
    return false;
}

function debugPrint(message) {
    print("[Behavior] " + message);
}

function safeCall(func) {
    if (func) {
        func();
    }
}

function delayedCallback(delay, callback) {
    var event = script.createEvent("DelayedCallbackEvent");
    event.bind(callback);
    event.reset(delay);
    return event;
}

function getOrAddComponent(obj, componentType) {
    return obj.getComponent(componentType) || obj.createComponent(componentType);
}

function createAndBindEvent(eventType, callback) {
    script.createEvent(eventType).bind(callback);
}

function whenValueBecomes(valueFunc, desiredValue, callback, allowRepeat, optInitialValue) {
    var lastValue;
    var initLastValue = function() {
        lastValue = (!allowRepeat && optInitialValue === undefined) ? valueFunc() : optInitialValue;
    };
    resetUpdateChecks.push(initLastValue);
    initLastValue();

    createAndBindEvent("UpdateEvent", function() {
        var newValue = valueFunc();
        if (newValue === desiredValue && (allowRepeat || lastValue !== desiredValue)) {
            callback();
        }
        lastValue = newValue;
    });
}

function checkCompareType(a, b, compareType) {
    return comparisonFuncs[compareType](getSign(a - b));
}

function whenCompareTypeMatches(a, b, compareType, callback, allowRepeat, optInitialValue) {
    var aFunc = typeof a === "function" ? a : function() {
        return a;
    };
    var bFunc = typeof b === "function" ? b : function() {
        return b;
    };
    whenValueBecomes(function() {
        return checkCompareType(aFunc(), bFunc(), compareType);
    }, true, callback, allowRepeat, optInitialValue);
}

function wrapFunction(origFunc, newFunc) {
    if (!origFunc) {
        return newFunc;
    }
    return function() {
        origFunc();
        newFunc();
    };
}

function setBaseTexForVis(vis, tex) {
    if (vis && vis.mainPass) {
        vis.mainPass.baseTex = tex;
        return true;
    }
}

function getBaseTexForVis(vis) {
    return vis && vis.mainPass && vis.mainPass.baseTex;
}

function setTranPos(transform, position, useLocal) {
    return useLocal ? transform.setLocalPosition(position) : transform.setWorldPosition(position);
}

function setTranRot(transform, rotation, useLocal) {
    return useLocal ? transform.setLocalRotation(rotation) : transform.setWorldRotation(rotation);
}

function setTranScale(transform, scale, useLocal) {
    return useLocal ? transform.setLocalScale(scale) : transform.setWorldScale(scale);
}

function getFallbackComponent(component, componentType) {
    return component || script.getSceneObject().getComponent(componentType);
}
var customTriggerIndex = 0;

function reInitialize() {
    lastTriggerTime = null;
    resetUpdateChecks.forEach(safeCall);
}
global.scBehaviorSystem.addCustomTriggerResponse("_reinitialize_all_behaviors", reInitialize);

function setupTrigger() {
    switch (script.triggeringEventType) {
        case "TouchEvent":
            setupTouchEvent();
            break;
        case "FaceEvent":
            setupFaceEvent();
            break;
        case "OnAwake":
            setupOnAwake();
            break;
        case "TurnOnEvent":
            setupTurnOnEvent();
            break;
        case "UpdateEvent":
        case "LateUpdateEvent":
        case "CameraFrontEvent":
        case "CameraBackEvent":
            createAndBindEvent(script.triggeringEventType, onTrigger);
            break;
        case "InteractionEvent":
            setupInteractionEvent();
            break;
        case "animationEnd":
            setupAnimationEnd();
            break;
        case "tweenEnd":
            setupTweenEnd();
            break;
        case "lookingAt":
            setupLookingAt();
            break;
        case "distanceCheck":
            setupDistanceCheck();
            break;
        case "markerTrackingEvent":
            setupMarkerTrackingEvent();
            break;
        case "objectTrackingEvent":
            setupObjectTrackingEvent();
            break;
        case "landmarkerEvent":
            setupLandmarkerEvent();
            break;
        case "machineLearningEvent":
            setupMachineLearningEvent();
            break;
        case "recordingStart":
            setupRecordingStart();
            break;
        case "onCustomTrigger":
            setupOnCustomTrigger();
            break;
    }
}

function doResponse() {
    switch (script.responseType) {
        case "textureAnimation":
            triggerTextureAnimation();
            break;
        case "animateMesh":
            triggerAnimateMesh();
            break;
        case "playSound":
            triggerPlaySound();
            break;
        case "playVideo":
            triggerPlayVideo();
            break;
        case "setEnabled":
            triggerSetEnabled();
            break;
        case "setColor":
            triggerSetColor();
            break;
        case "setTexture":
            triggerSetTexture();
            break;
        case "setText":
            triggerSetText();
            break;
        case "runTween":
            triggerRunTween();
            break;
        case "setPosition":
            triggerSetPosition();
            break;
        case "setRotation":
            triggerSetRotation();
            break;
        case "setScale":
            triggerSetScale();
            break;
        case "setScreenPosition":
            triggerSetScreenPosition();
            break;
        case "setScreenRotation":
            triggerSetScreenRotation();
            break;
        case "setScreenSize":
            triggerSetScreenSize();
            break;
        case "setBlendshapes":
            triggerSetBlendshapes();
            break;
        case "setMaterialParameter":
            triggerSetMaterialParameter();
            break;
        case "setTouchBlocking":
            triggerSetTouchBlocking();
            break;
        case "showHint":
            triggerShowHint();
            break;
        case "machineLearning":
            triggerMachineLearning();
            break;
        case "instantiatePrefab":
            triggerInstantiatePrefab();
            break;
        case "destroyObject":
            triggerDestroyObject();
            break;
        case "printMessage":
            triggerPrintMessage();
            break;
        case "callScriptAPI":
            triggerCallScriptAPI();
            break;
        case "sendCustomTrigger":
            triggerSendCustomTrigger();
            break;
        case "animateSprite":
            debugPrint("Response type Animate Sprite is DEPRECATED.\nPlease use Animate Image instead.");
            break;
        case "setBillboardPosition":
            debugPrint("Response type Set Billboard Position is DEPRECATED.\nPlease use Set Screen Position instead.");
            break;
        case "setBillboardRotation":
            debugPrint("Response type Set Billboard Rotation is DEPRECATED.\nPlease use Set Screen Rotation instead.");
            break;
        case "setBillboardSize":
            debugPrint("Response type Set Billboard Size is DEPRECATED.\nPlease use Set Screen Size instead.");
            break;
    }
    localTriggerResponses.forEach(safeCall);
}

function onTrigger() {
    var curTime = getTime();
    if (script.triggerLimitType == "Once") {
        if (lastTriggerTime) {
            return;
        }
    } else {
        if (script.triggerLimitType == "Interval") {
            if (curTime < (lastTriggerTime + script.triggerInterval)) {
                return;
            }
        }
    }
    lastTriggerTime = curTime;
    if (script.triggerDelay > 0) {
        delayedCallback(script.triggerDelay, doResponse);
    } else {
        doResponse();
    }
}

function setupTouchEvent() {
    var targetScript = script;
    if (script.touchEventTouchTarget) {
        var targetObj = script.touchEventTouchTarget.getSceneObject();
        var touchComponent = getOrAddComponent(targetObj, "Component.TouchComponent");
        touchComponent.addMeshVisual(script.touchEventTouchTarget);
        targetScript = targetObj.createComponent("Component.ScriptComponent");
    }
    targetScript.createEvent(script.touchEventEventType).bind(onTrigger);
}

function setupFaceEvent() {
    var faceEvent = script.createEvent(script.faceEventEventType);
    faceEvent.faceIndex = script.faceEventFaceIndex;
    faceEvent.bind(onTrigger);
}

function setupOnAwake() {
    global.scBehaviorSystem.addCustomTriggerResponse("_trigger_all_awake_behaviors", onTrigger);
    onTrigger();
}

function setupTurnOnEvent() {
    createAndBindEvent("OnStartEvent", onTrigger);
    global.scBehaviorSystem.addCustomTriggerResponse("_trigger_all_turn_on_behaviors", onTrigger);
}

function setupInteractionEvent() {
    if (!script.interactionEventTarget) {
        debugPrint("Target must be set!");
        return;
    }
    var targetObj = script.interactionEventTarget.getSceneObject();
    var interactionComponent = getOrAddComponent(targetObj, "Component.InteractionComponent");
    interactionComponent.addMeshVisual(script.interactionEventTarget);
    interactionComponent[script.interactionEventEventType].add(onTrigger);
}

function setupAnimationEnd() {
    switch (script.animType) {
        case "Animated Texture":
            if (!script.animationEndAnimatedTexture) {
                debugPrint("Animated Texture must be set!");
                return;
            }
            script.animationEndAnimatedTexture.control.setOnFinish(onTrigger);
            break;
        case "Image Visual":
            if (!script.animationEndImageVisual) {
                debugPrint("Image Visual must be set!");
                return;
            }
            if (script.animationEndImageVisual.mainPass) {
                script.animationEndImageVisual.mainPass.baseTex.control.setOnFinish(onTrigger);
            }
            break;
        case "Sprite Visual":
            debugPrint("Sprite Visual is DEPRECATED in Anim Type.\nPlease use Image Visual instead.");
            break;
        case "Animation Mixer":
            if (!script.animationEndAnimMixer) {
                debugPrint("Anim Mixer must be set!");
                return;
            }
            if (!script.animationEndAnimLayerName) {
                debugPrint("Anim Layer Name must be set!");
                return;
            }
            var mixerLayer = script.animationEndAnimMixer.getLayer(script.animationEndAnimLayerName);
            if (!mixerLayer) {
                debugPrint("Animation Mixer layer couldn't be found: " + script.animationEndAnimLayerName);
                return;
            }
            whenValueBecomes(function() {
                return mixerLayer.isPlaying();
            }, false, onTrigger, false);
            break;
    }
}

function setupTweenEnd() {
    if (!global.tweenManager) {
        debugPrint("Could not find global.tweenManager - have you added Tween Manager to your project?");
        return;
    }
    if (!global.tweenManager.isPlaying) {
        debugPrint("global.tweenManager does not contain isPlaying() - is your version up to date?");
        return;
    }
    var isPlaying = function() {
        return global.tweenManager.isPlaying(script.tweenEndTargetObject, script.tweenEndTweenName);
    };
    whenValueBecomes(isPlaying, false, onTrigger, false, false);
}

function setupLookingAt() {
    if (!script.lookingAtLookingObject) {
        debugPrint("Looking Object must be set!");
        return;
    }
    if (!script.lookingAtLookTarget) {
        debugPrint("Look Target must be set!");
        return;
    }
    var cutoffRadians = script.lookingAtAngle * Math.PI / 180;
    var transformA = script.lookingAtLookingObject.getTransform();
    var transformB = script.lookingAtLookTarget.getTransform();
    whenCompareTypeMatches(function() {
        var dir = transformB.getWorldPosition().sub(transformA.getWorldPosition()).normalize();
        var forward = script.lookingAtFlipForwardVec ? transformA.back : transformA.forward;
        return forward.angleTo(dir);
    }, cutoffRadians, script.lookingAtCompareType, onTrigger, script.lookingAtAllowRepeat, false);
}

function setupDistanceCheck() {
    if (!script.distanceCheckObjectA) {
        debugPrint("Object A must be set!");
        return;
    }
    if (!script.distanceCheckObjectB) {
        debugPrint("Object B must be set!");
        return;
    }
    var transformA = script.distanceCheckObjectA.getTransform();
    var transformB = script.distanceCheckObjectB.getTransform();
    var flattenZ = script.distanceCheckFlattenZForScreenTransforms && script.distanceCheckObjectA.getComponent("Component.ScreenTransform") && script.distanceCheckObjectB.getComponent("Component.ScreenTransform");
    var distFunc = flattenZ ? function() {
        var offset = transformB.getWorldPosition().sub(transformA.getWorldPosition());
        offset.z = 0;
        return offset.length;
    } :
        function() {
            return transformA.getWorldPosition().distance(transformB.getWorldPosition());
        };
    whenCompareTypeMatches(distFunc, script.distanceCheckDistance, script.distanceCheckCompareType, onTrigger, script.distanceCheckAllowRepeat, false);
}

function setupMarkerTrackingEvent() {
    if (!script.markerTrackingEventMarkerTracking) {
        debugPrint("Marker Tracking must be set!");
        return;
    }
    var tracker = script.markerTrackingEventMarkerTracking;
    switch (script.markerTrackingEventEventType) {
        case "Marker Found":
            tracker.onMarkerFound = wrapFunction(tracker.onMarkerFound, onTrigger);
            break;
        case "Marker Lost":
            tracker.onMarkerLost = wrapFunction(tracker.onMarkerLost, onTrigger);
            break;
    }
}

function setupObjectTrackingEvent() {
    if (!script.objectTrackingEventObjectTracking) {
        debugPrint("Object Tracking must be set!");
        return;
    }
    var tracker = script.objectTrackingEventObjectTracking;
    switch (script.objectTrackingEventEventType) {
        case "Object Found":
            tracker.onObjectFound = wrapFunction(tracker.onObjectFound, onTrigger);
            break;
        case "Object Lost":
            tracker.onObjectLost = wrapFunction(tracker.onObjectLost, onTrigger);
            break;
        case "Descriptor Start":
            if (!script.objectTrackingEventDescStartKey) {
                debugPrint("Descriptor must be set!");
                return;
            }
            tracker.registerDescriptorStart(script.objectTrackingEventDescStartKey, onTrigger);
            break;
        case "Descriptor End":
            if (!script.objectTrackingEventDescEndKey) {
                debugPrint("Descriptor must be set!");
                return;
            }
            tracker.registerDescriptorEnd(script.objectTrackingEventDescEndKey, onTrigger);
            break;
    }
}

function setupLandmarkerEvent() {
    if (!script.landmarkerEventLocationTracking) {
        debugPrint("Location Tracking must be set!");
        return;
    }
    var tracker = script.landmarkerEventLocationTracking;
    switch (script.landmarkerEventEventType) {
        case "Location Found":
            tracker.onLocationFound = wrapFunction(tracker.onLocationFound, onTrigger);
            break;
        case "Location Lost":
            tracker.onLocationLost = wrapFunction(tracker.onLocationLost, onTrigger);
            break;
    }
}

function setupMachineLearningEvent() {
    if (!script.machineLearningEventMlComponent) {
        debugPrint("ML Component must be set!");
        return;
    }
    var mlComponent = script.machineLearningEventMlComponent;
    switch (script.machineLearningEventEventType) {
        case "Loading Finished":
            mlComponent.onLoadingFinished = wrapFunction(mlComponent.onLoadingFinished, onTrigger);
            break;
        case "Running Finished":
            mlComponent.onRunningFinished = wrapFunction(mlComponent.onRunningFinished, onTrigger);
            break;
    }
}

function setupRecordingStart() {
    whenValueBecomes(function() {
        return global.scene.isRecording();
    }, true, onTrigger, false);
}

function setupOnCustomTrigger() {
    if (script.onCustomTriggerUseList) {
        for (var i = 0; i < script.onCustomTriggerTriggerNames.length; i++) {
            global.scBehaviorSystem.addCustomTriggerResponse(script.onCustomTriggerTriggerNames[i], onTrigger);
        }
    } else {
        if (!script.onCustomTriggerTriggerName) {
            debugPrint("Trigger Name must be set!");
            return;
        }
        global.scBehaviorSystem.addCustomTriggerResponse(script.onCustomTriggerTriggerName, onTrigger);
    }
}

function triggerTextureAnimation() {
    if (!(script.animateImageAnimatedTexture || script.animateImageVisualObject)) {
        debugPrint("Image Target must be set!");
        return;
    }
    if (script.animateImageAnimatedTexture && script.animateImageVisualObject) {
        setBaseTexForVis(script.animateImageVisualObject, script.animateImageAnimatedTexture);
    }
    var tex = script.animateImageAnimatedTexture || getBaseTexForVis(script.animateImageVisualObject);
    if (!tex) {
        debugPrint("Animated Texture not found!");
        return;
    }
    var control = tex.control;
    if (!control.isOfType("Provider.AnimatedTextureFileProvider")) {
        debugPrint("Animated Texture provider must be of type: Provider.AnimatedTextureFileProvider");
        return;
    }
    if (script.animateImageAdvanced) {
        control.isPingPong = script.animateImagePingPong;
        control.isReversed = script.animateImageReverse;
    }
    switch (script.animateImageAction) {
        case "Play":
            control.play(script.animateImageLoop ? -1 : 1, 0);
            break;
        case "Play or Resume":
            if (control.isPlaying()) {
                control.resume();
            } else {
                control.play(script.animateImageLoop ? -1 : 1, 0);
            }
            break;
        case "Pause":
            control.pause();
            break;
        case "Pause at Frame":
            control.pauseAtFrame(script.animateImagePauseFrame);
            break;
        case "Toggle":
            if (control.isPlaying()) {
                if (control.isPaused()) {
                    control.resume();
                } else {
                    control.pause();
                }
            } else {
                control.play(script.animateImageLoop ? -1 : 1, 0);
            }
            break;
        case "Stop":
            control.stop();
            break;
    }
}

function triggerAnimateMesh() {
    if (!script.animateMeshAnimationMixer) {
        debugPrint("Animation Mixer must be set!");
        return;
    }
    if (!script.animateMeshLayerName) {
        debugPrint("Layer Name must be set!");
        return;
    }
    var mixerLayer = script.animateMeshAnimationMixer.getLayer(script.animateMeshLayerName);
    mixerLayer.weight = script.animateMeshWeight;
    if (script.animateMeshStopOtherLayers) {
        var layers = script.animateMeshAnimationMixer.getLayers();
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].name !== script.animateMeshLayerName) {
                layers[i].stop();
                layers[i].weight = 0;
            }
        }
    }
    switch (script.animateMeshAction) {
        case "Play":
            mixerLayer.start(0, script.animateMeshLoop ? -1 : 1);
            break;
        case "Play or Resume":
            if (mixerLayer.isPlaying()) {
                mixerLayer.resume();
            } else {
                mixerLayer.start(0, script.animateMeshLoop ? -1 : 1);
            }
            break;
        case "Pause":
            mixerLayer.pause();
            break;
        case "Stop":
            mixerLayer.stop();
            break;
    }
}

function triggerPlaySound() {
    switch (script.playSoundAction) {
        case "Play":
            script.playSoundAudioComponent = script.playSoundAudioComponent ||
                script.getSceneObject().createComponent("Component.AudioComponent");
            if (script.playSoundAudioTrack) {
                script.playSoundAudioComponent.audioTrack = script.playSoundAudioTrack;
            }
            script.playSoundAudioComponent.volume = script.playSoundVolume;
            script.playSoundAudioComponent.play(script.playSoundLoop ? -1 : 1);
            break;
        case "Stop":
            if (!script.playSoundAudioComponent) {
                debugPrint("Audio Component must be set!");
                return;
            }
            script.playSoundAudioComponent.stop(script.playSoundFadeOut);
            break;
    }
}

function triggerPlayVideo() {
    if (!(script.playVideoVideoTexture || script.playVideoVisualObject)) {
        debugPrint("Video Target must be set!");
        return;
    }
    if (script.playVideoVideoTexture && script.playVideoVisualObject) {
        setBaseTexForVis(script.playVideoVisualObject, script.playVideoVideoTexture);
    }
    var tex = script.playVideoVideoTexture || getBaseTexForVis(script.playVideoVisualObject);
    if (!tex) {
        debugPrint("Video Texture not found!");
        return;
    }
    var control = tex.control;
    if (!control.isOfType("Provider.VideoTextureProvider")) {
        debugPrint("Video Texture provider must be of type: Provider.VideoTextureProvider");
        return;
    }
    var status = control.getStatus();
    var playCount = script.playVideoLoop ? -1 : 1;
    var safePlay = function() {
        switch (status) {
            case VideoStatus.Stopped:
                control.play(playCount);
                break;
            case VideoStatus.Playing:
            case VideoStatus.Paused:
                control.stop();
                control.play(playCount);
                break;
        }
    };
    switch (script.playVideoAction) {
        case "Play":
            safePlay();
            break;
        case "Play or Resume":
            if (status == VideoStatus.Paused) {
                control.resume();
            } else {
                safePlay();
            }
            break;
        case "Pause":
            if (status == VideoStatus.Playing) {
                control.pause();
            }
            break;
        case "Toggle":
            switch (status) {
                case VideoStatus.Paused:
                    control.resume();
                    break;
                case VideoStatus.Playing:
                    control.pause();
                    break;
                case VideoStatus.Preparing:
                    control.stop();
                    break;
                case VideoStatus.Stopped:
                    control.play(playCount);
                    break;
            }
            break;
        case "Stop":
            if (status != VideoStatus.Stopped) {
                control.stop();
            }
            break;
    }
}

function triggerSetEnabled() {
    var obj = (script.setEnabledTarget || script.getSceneObject());
    switch (script.setEnabledAction) {
        case "Enable":
            obj.enabled = true;
            break;
        case "Disable":
            obj.enabled = false;
            break;
        case "Toggle":
            obj.enabled = !obj.enabled;
            break;
    }
}

function triggerSetColor() {
    var mat = script.setColorVisual || script.setColorMaterial;
    if (!mat) {
        debugPrint("Color Target must be set!");
        return;
    }
    mat.mainPass.baseColor = script.setColorColor;
}

function triggerSetTexture() {
    if (!script.setTextureTarget) {
        debugPrint("Target must be set!");
        return;
    }
    script.setTextureTarget.mainPass.baseTex = script.setTextureNewTexture || null;
}

function triggerSetText() {
    if (!script.setTextTextComponent) {
        debugPrint("Text Component must be set!");
        return;
    }
    script.setTextTextComponent.text = script.setTextText;
}

function triggerRunTween() {
    if (!script.runTweenTweenName) {
        debugPrint("Tween Name must be set!");
        return;
    }
    if (!global.tweenManager) {
        debugPrint("Could not find global.tweenManager - have you added Tween Manager to your project?");
        return;
    }
    var obj = (script.runTweenTargetObject || script.getSceneObject());
    switch (script.runTweenAction) {
        case "Start":
            global.tweenManager.startTween(obj, script.runTweenTweenName);
            break;
        case "Stop":
            global.tweenManager.stopTween(obj, script.runTweenTweenName);
            break;
        case "Pause":
            global.tweenManager.pauseTween(obj, script.runTweenTweenName);
            break;
        case "Resume":
            var pauseCheck = global.tweenManager.isPaused;
            if (pauseCheck && pauseCheck(obj, script.runTweenTweenName)) {
                global.tweenManager.resumeTween(obj, script.runTweenTweenName);
            } else {
                var playingCheck = global.tweenManager.isPlaying;
                if (!playingCheck || !playingCheck(obj, script.runTweenTweenName)) {
                    global.tweenManager.startTween(obj, script.runTweenTweenName);
                }
            }
            break;
    }
}

function triggerSetPosition() {
    var tran = (script.setPositionObjectToMove || script).getTransform();
    setTranPos(tran, script.setPositionPosition, script.setPositionLocalSpace);
}

function triggerSetRotation() {
    var tran = (script.setRotationObjectToRotate || script).getTransform();
    setTranRot(tran, quat.fromEulerVec(script.setRotationRotationAngle.uniformScale(Math.PI / 180)), script.setRotationLocalSpace);
}

function triggerSetScale() {
    var tran = (script.setScaleObjectToScale || script).getTransform();
    setTranScale(tran, script.setScaleScale, script.setScaleLocalSpace);
}

function triggerSetScreenPosition() {
    var screenTran = getFallbackComponent(script.setScreenPositionScreenTransform, "Component.ScreenTransform");
    if (!screenTran) {
        debugPrint("Screen Transform must be set!");
        return;
    }
    switch (script.setScreenPositionPositionType) {
        case "Basic Position":
            screenTran.position = script.setScreenPositionBasicPosition;
            break;
        case "Anchors Rect":
            screenTran.anchors.setCenter(script.setScreenPositionAnchorsCenter);
            break;
        case "Offsets Rect":
            screenTran.offsets.setCenter(script.setScreenPositionOffsetsCenter);
            break;
    }
}

function triggerSetScreenRotation() {
    var screenTran = getFallbackComponent(script.setScreenRotationScreenTransform, "Component.ScreenTransform");
    if (!screenTran) {
        debugPrint("Screen Transform must be set!");
        return;
    }
    var rot = quat.fromEulerAngles(0, 0, script.setScreenRotationAngle * Math.PI / 180);
    screenTran.rotation = rot;
}

function triggerSetScreenSize() {
    var screenTran = getFallbackComponent(script.setScreenSizeScreenTransform, "Component.ScreenTransform");
    if (!screenTran) {
        debugPrint("Screen Transform must be set!");
        return;
    }
    switch (script.setScreenSizeSizeType) {
        case "Basic Scale":
            screenTran.scale = script.setScreenSizeBasicScale;
            break;
        case "Anchors Rect":
            screenTran.anchors.setSize(script.setScreenSizeAnchorsSize);
            break;
        case "Offsets Rect":
            screenTran.offsets.setSize(script.setScreenSizeOffsetsSize);
            break;
    }
}

function triggerSetBlendshapes() {
    if (!script.setBlendshapesBlendshapes) {
        debugPrint("Blendshapes must be set!");
        return;
    }
    script.setBlendshapesBlendshapes.setBlendShape(script.setBlendshapesName, script.setBlendshapesWeight);
}

function triggerSetMaterialParameter() {
    var target;
    if (!script.setMaterialParameterParameterName) {
        debugPrint("Parameter Name must be set!");
        return;
    }
    var val;
    switch (script.setMaterialParameterTargetType) {
        case "Material":
            if (!script.setMaterialParameterMaterial) {
                debugPrint("Material must be set!");
                return;
            }
            target = script.setMaterialParameterMaterial.mainPass;
            break;
        case "MeshVisual":
            if (!script.setMaterialParameterMeshVisual) {
                debugPrint("Mesh Visual must be set!");
                return;
            }
            target = script.setMaterialParameterMeshVisual.mainPass;
            break;
        case "VFX Asset":
            if (!script.setMaterialParameterVFXAsset) {
                debugPrint("VFX Asset must be set!");
                return;
            }
            target = script.setMaterialParameterVFXAsset.properties;
            break;
        case "VFX Component":
            if (!script.setMaterialParameterVFXComponent) {
                debugPrint("VFX Component must be set!");
                return;
            }
            target = script.setMaterialParameterVFXComponent.asset.properties;
            break;
    }
    switch (script.setMaterialParameterValueType) {
        case "bool":
            val = script.setMaterialParameterBoolValue;
            break;
        case "int":
            val = script.setMaterialParameterIntValue;
            break;
        case "float":
            val = script.setMaterialParameterFloatValue;
            break;
        case "Color (RGB)":
            val = script.setMaterialParameterColorRGBValue;
            break;
        case "Color (RGBA)":
            val = script.setMaterialParameterColorRGBAValue;
            break;
        case "Texture":
            val = script.setMaterialParameterTextureValue;
            break;
        case "vec2":
            val = script.setMaterialParameterVec2Value;
            break;
        case "vec3":
            val = script.setMaterialParameterVec3Value;
            break;
        case "vec4":
            val = script.setMaterialParameterVec4Value;
            break;
    }
    try {
        target[script.setMaterialParameterParameterName] = val;
    } catch (err) {
        debugPrint("Wrong value type assigned for the " + script.setMaterialParameterParameterName + " parameter!");
    }
}

function triggerSetTouchBlocking() {
    switch (script.setTouchBlockingTargetType) {
        case "Global Touches":
            global.touchSystem.touchBlocking = script.setTouchBlockingGlobalTouchBlocking;
            global.touchSystem.enableTouchBlockingException("TouchTypeTouch", script.setTouchBlockingTouchTypeTouch);
            global.touchSystem.enableTouchBlockingException("TouchTypeTap", script.setTouchBlockingTouchTypeTap);
            global.touchSystem.enableTouchBlockingException("TouchTypeDoubleTap", script.setTouchBlockingTouchTypeDoubleTap);
            global.touchSystem.enableTouchBlockingException("TouchTypeScale", script.setTouchBlockingTouchTypeScale);
            global.touchSystem.enableTouchBlockingException("TouchTypePan", script.setTouchBlockingTouchTypePan);
            global.touchSystem.enableTouchBlockingException("TouchTypeSwipe", script.setTouchBlockingTouchTypeSwipe);
            break;
        case "Touch Component":
            if (!script.setTouchBlockingTouchComponent) {
                debugPrint("Touch Component must be set!");
                return;
            }
            if (script.setTouchBlockingTouchTypeTouch) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypeTouch");
            }
            if (script.setTouchBlockingTouchTypeTap) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypeTap");
            }
            if (script.setTouchBlockingTouchTypeDoubleTap) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypeDoubleTap");
            }
            if (script.setTouchBlockingTouchTypeScale) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypeScale");
            }
            if (script.setTouchBlockingTouchTypePan) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypePan");
            }
            if (script.setTouchBlockingTouchTypeSwipe) {
                script.setTouchBlockingTouchComponent.addTouchBlockingException("TouchTypeSwipe");
            }
            break;
    }
}

function triggerShowHint() {
    var hintLookup = [
        "lens_hint_aim_camera_at_the_sky",
        "lens_hint_blow_a_kiss",
        "lens_hint_blow_a_kiss_voice_changer",
        "lens_hint_come_closer",
        "lens_hint_do_not_smile",
        "lens_hint_do_not_try_with_a_friend",
        "lens_hint_draw_with_your_finger",
        "lens_hint_find_face",
        "lens_hint_find_image",
        "lens_hint_find_marker",
        "lens_hint_find_snapcode",
        "lens_hint_kiss",
        "lens_hint_kiss_again",
        "lens_hint_look_around",
        "lens_hint_look_down",
        "lens_hint_look_left",
        "lens_hint_look_right",
        "lens_hint_look_up",
        "lens_hint_make_some_noise",
        "lens_hint_move_your_head",
        "lens_hint_nod_your_head",
        "lens_hint_now_kiss",
        "lens_hint_now_open_your_mouth",
        "lens_hint_now_raise_your_eyebrows",
        "lens_hint_now_smile",
        "lens_hint_open_your_mouth",
        "lens_hint_open_your_mouth_again",
        "lens_hint_open_your_mouth_voice_changer",
        "lens_hint_pick_a_face",
        "lens_hint_pick_a_photo",
        "lens_hint_pick_an_image",
        "lens_hint_raise_your_eyebrows",
        "lens_hint_raise_your_eyebrows_again",
        "lens_hint_raise_eyebrows_or_open_mouth",
        "lens_hint_raise_your_eyebrows_voice_changer",
        "lens_hint_rotate_your_phone",
        "lens_hint_say_something",
        "lens_hint_smile",
        "lens_hint_smile_again",
        "lens_hint_smile_voice_changer",
        "lens_hint_swap_camera",
        "lens_hint_tap_a_surface",
        "lens_hint_tap_ground_to_place",
        "lens_hint_tap_surface_to_place",
        "lens_hint_tap_ground",
        "lens_hint_tap",
        "lens_hint_tilt_your_head",
        "lens_hint_try_friend",
        "lens_hint_try_rear_camera",
        "lens_hint_turn_around",
        "lens_hint_voice_changer",
        "lens_hint_walk_through_the_door"
    ];
    var hintId = hintLookup[script.showHintHint];
    var hintComponent = getOrAddComponent(script.getSceneObject(), "Component.HintsComponent");
    debugPrint("Showing hint (visible on device but not in Lens Studio): " + hintId);
    hintComponent.showHint(hintId, script.showHintDuration);
}

function triggerMachineLearning() {
    if (!script.runMLMlComponent) {
        debugPrint("ML Component must be set!");
        return;
    }
    var mlComponent = script.runMLMlComponent;
    switch (script.runMLAction) {
        case "Build":
            mlComponent.build([]);
            break;
        case "Run Immediate":
            if (mlComponent.state != MachineLearning.ModelState.Idle) {
                debugPrint("MLComponent can't run because it is not in Idle state!");
                return;
            }
            mlComponent.runImmediate(script.runMLSync);
            break;
        case "Run Scheduled":
            if (mlComponent.state != MachineLearning.ModelState.Idle) {
                debugPrint("MLComponent can't run because it is not in Idle state!");
                return;
            }
            mlComponent.runScheduled(script.runMLRecurring, script.runMLStartTiming, script.runMLEndTiming);
            break;
        case "Cancel":
            mlComponent.cancel();
            break;
        case "Stop":
            mlComponent.stop();
            break;
    }
}

function triggerInstantiatePrefab() {
    if (!script.instantiatePrefabPrefab) {
        debugPrint("Prefab must be set!");
        return;
    }
    script.instantiatePrefabPrefab.instantiate(script.instantiatePrefabParent || null);
}

function triggerDestroyObject() {
    if (!(isNull(script.destroyObjectObject))) {
        script.destroyObjectObject.destroy();
    }
}

function triggerPrintMessage() {
    debugPrint(script.printMessageText);
}

function triggerCallScriptAPI() {
    if (!script.callScriptAPIScriptComponent) {
        debugPrint("Script Component must be set!");
        return;
    }
    var callScriptAPI_arg1Val;
    switch (script.callScriptAPI_arg1ValueType) {
        case "None":

            break;
        case "bool":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1BoolValue;
            break;
        case "int":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1IntValue;
            break;
        case "float":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1FloatValue;
            break;
        case "string":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1StringValue;
            break;
        case "Color (RGB)":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1ColorRGBValue;
            break;
        case "Color (RGBA)":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1ColorRGBAValue;
            break;
        case "vec2":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec2Value;
            break;
        case "vec3":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec3Value;
            break;
        case "vec4":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec4Value;
            break;
        case "SceneObject":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1SceneObjectValue;
            break;
        case "Asset":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1AssetValue;
            break;
        case "Texture":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1TextureValue;
            break;
        case "Component":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1ComponentValue;
            break;
        case "bool Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1BoolArrayValue;
            break;
        case "int Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1IntArrayValue;
            break;
        case "float Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1FloatArrayValue;
            break;
        case "string Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1StringArrayValue;
            break;
        case "vec2 Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec2ArrayValue;
            break;
        case "vec3 Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec3ArrayValue;
            break;
        case "vec4 Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1Vec4ArrayValue;
            break;
        case "SceneObject Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1SceneObjectArrayValue;
            break;
        case "Asset Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1AssetArrayValue;
            break;
        case "Texture Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1TextureArrayValue;
            break;
        case "Component Array":
            callScriptAPI_arg1Val = script.callScriptAPI_arg1ComponentArrayValue;
            break;
    }
    var callScriptAPI_arg2Val;
    switch (script.callScriptAPI_arg2ValueType) {
        case "None":

            break;
        case "bool":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2BoolValue;
            break;
        case "int":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2IntValue;
            break;
        case "float":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2FloatValue;
            break;
        case "string":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2StringValue;
            break;
        case "Color (RGB)":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2ColorRGBValue;
            break;
        case "Color (RGBA)":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2ColorRGBAValue;
            break;
        case "vec2":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec2Value;
            break;
        case "vec3":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec3Value;
            break;
        case "vec4":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec4Value;
            break;
        case "SceneObject":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2SceneObjectValue;
            break;
        case "Asset":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2AssetValue;
            break;
        case "Texture":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2TextureValue;
            break;
        case "Component":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2ComponentValue;
            break;
        case "bool Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2BoolArrayValue;
            break;
        case "int Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2IntArrayValue;
            break;
        case "float Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2FloatArrayValue;
            break;
        case "string Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2StringArrayValue;
            break;
        case "vec2 Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec2ArrayValue;
            break;
        case "vec3 Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec3ArrayValue;
            break;
        case "vec4 Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2Vec4ArrayValue;
            break;
        case "SceneObject Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2SceneObjectArrayValue;
            break;
        case "Asset Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2AssetArrayValue;
            break;
        case "Texture Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2TextureArrayValue;
            break;
        case "Component Array":
            callScriptAPI_arg2Val = script.callScriptAPI_arg2ComponentArrayValue;
            break;
    }
    var callScriptAPI_valueVal;
    switch (script.callScriptAPI_valueValueType) {
        case "None":

            break;
        case "bool":
            callScriptAPI_valueVal = script.callScriptAPI_valueBoolValue;
            break;
        case "int":
            callScriptAPI_valueVal = script.callScriptAPI_valueIntValue;
            break;
        case "float":
            callScriptAPI_valueVal = script.callScriptAPI_valueFloatValue;
            break;
        case "string":
            callScriptAPI_valueVal = script.callScriptAPI_valueStringValue;
            break;
        case "Color (RGB)":
            callScriptAPI_valueVal = script.callScriptAPI_valueColorRGBValue;
            break;
        case "Color (RGBA)":
            callScriptAPI_valueVal = script.callScriptAPI_valueColorRGBAValue;
            break;
        case "vec2":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec2Value;
            break;
        case "vec3":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec3Value;
            break;
        case "vec4":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec4Value;
            break;
        case "SceneObject":
            callScriptAPI_valueVal = script.callScriptAPI_valueSceneObjectValue;
            break;
        case "Asset":
            callScriptAPI_valueVal = script.callScriptAPI_valueAssetValue;
            break;
        case "Texture":
            callScriptAPI_valueVal = script.callScriptAPI_valueTextureValue;
            break;
        case "Component":
            callScriptAPI_valueVal = script.callScriptAPI_valueComponentValue;
            break;
        case "bool Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueBoolArrayValue;
            break;
        case "int Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueIntArrayValue;
            break;
        case "float Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueFloatArrayValue;
            break;
        case "string Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueStringArrayValue;
            break;
        case "vec2 Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec2ArrayValue;
            break;
        case "vec3 Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec3ArrayValue;
            break;
        case "vec4 Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueVec4ArrayValue;
            break;
        case "SceneObject Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueSceneObjectArrayValue;
            break;
        case "Asset Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueAssetArrayValue;
            break;
        case "Texture Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueTextureArrayValue;
            break;
        case "Component Array":
            callScriptAPI_valueVal = script.callScriptAPI_valueComponentArrayValue;
            break;
    }
    var targetAPI = script.callScriptAPIScriptComponent.api;
    switch (script.callScriptAPICallType) {
        case 0:
            if (!script.callScriptAPIFunctionName) {
                debugPrint("Function Name must be set!");
                return;
            }
            var apiFunc = targetAPI[script.callScriptAPIFunctionName];
            if (apiFunc) {
                apiFunc(callScriptAPI_arg1Val, callScriptAPI_arg2Val);
            } else {
                debugPrint("script.api object missing function named '" + script.callScriptAPIFunctionName + "'");
            }
            break;
        case 1:
            if (!script.callScriptAPIPropertyName) {
                debugPrint("Property Name must be set!");
                return;
            }
            targetAPI[script.callScriptAPIPropertyName] = callScriptAPI_valueVal;
            break;
    }
}

function triggerSendCustomTrigger() {
    if (script.sendCustomTriggerUseList) {
        if (customTriggerIndex >= script.sendCustomTriggerTriggerNames.length) {
            if (script.sendCustomTriggerLoopAfterEnd) {
                customTriggerIndex = 0;
            } else {
                return;
            }
        }
        if (script.sendCustomTriggerTriggerNames[customTriggerIndex]) {
            global.scBehaviorSystem.sendCustomTrigger(script.sendCustomTriggerTriggerNames[customTriggerIndex]);
        }
        customTriggerIndex = (customTriggerIndex + 1);
    } else {
        if (!script.sendCustomTriggerTriggerName) {
            debugPrint("Trigger Name must be set!");
            return;
        }
        global.scBehaviorSystem.sendCustomTrigger(script.sendCustomTriggerTriggerName);
    }
}
script.api.trigger = onTrigger;
script.api.addTriggerResponse = function(callback) {
    localTriggerResponses.push(callback);
};
script.api.removeTriggerResponse = function(callback) {
    if (!removeFromArray(localTriggerResponses, callback)) {
        debugPrint("Failed to remove response");
    }
};
setupTrigger();
