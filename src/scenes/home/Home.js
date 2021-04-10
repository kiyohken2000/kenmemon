import React, { useRef, useState } from "react";
import { View, Text, ScrollView, Modal, StatusBar, TouchableOpacity } from "react-native";
import { actions, defaultActions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import HTMLView from "react-native-htmlview";
import styles from './style'
import { Divider } from 'react-native-elements'

export default function Home (props) {
  const strikethrough = require("../../../assets/images/logo-lg.png"); //icon for strikethrough
  const video = require("../../../assets/images/logo-lg.png"); //icon for Addvideo
  const RichText = useRef(); //reference to the RichEditor component
  const [article, setArticle] = useState("");
  const [leftmodal, setLeftToggle] = useState(false)
  const [rightmodal, setRightToggle] = useState(false)

  // this function will be called when the editor has been initialized
  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      console.log(
        "Toolbar click, selected items (insert end callback):",
        items
      );
    });
  }

  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }

  function onPressAddImage() {
    // you can easily add images from your gallery
    RichText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    );
  }

  function insertVideo() {
    // you can easily add videos from your gallery
    RichText.current?.insertVideo(
      "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
        <RichToolbar
          style={[styles.richBar]}
          editor={RichText}
          disabled={false}
          iconTint={"pink"}
          selectedIconTint={"purple"}
          disabledIconTint={"purple"}
          // onPressAddImage={onPressAddImage}
          iconSize={40}
          actions={[
            // "insertVideo",
            ...defaultActions,
            // actions.setStrikethrough,
            actions.heading1,
            actions.heading3,
          ]}
          // map icons for self made actions
          iconMap={{
            [actions.heading1]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
            ),
            [actions.heading3]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
            ),
            [actions.setStrikethrough]: strikethrough,
            // ["insertVideo"]: video,
          }}
          // insertVideo={insertVideo}
        />
        <ScrollView>
        <RichEditor
          disabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          style={styles.rich}
          placeholder={"Start Writing Here"}
          onChange={(text) => setArticle(text)}
          editorInitializedCallback={editorInitializedCallback}
          onHeightChange={handleHeightChange}
        />
        {/*<Text style={styles.text}>Result</Text>
        <HTMLView value={article} stylesheet={styles} />*/}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.leftbutton} onPress={() => setLeftToggle(true)}>
            <Text style={styles.buttonText}>Preview</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.rightbutton} onPress={() => setRightToggle(true)}>
            <Text style={styles.buttonText}>Source</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={leftmodal}
        transparent={false}
        animationType={"slide" || "fade"}
        presentationStyle={"fullScreen" || "pageSheet" || "formSheet" || "overFullScreen"}
      >
        <View style={styles.modalcontainer}>
          <View style={{ flex: 1, width: '100%' }}>
            <View style={styles.modaltitle}>
              <Text style={styles.title}>Preview</Text>
            </View>
            <Divider />
            <View style={{ flex: 7, width: '100%' }}>
              <HTMLView value={article} stylesheet={styles} />
            </View>
            <Divider />
            <View style={styles.footerContainer}>
              <TouchableOpacity style={styles.button} onPress={() => setLeftToggle(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={rightmodal}
        transparent={false}
        animationType={"slide" || "fade"}
        presentationStyle={"fullScreen" || "pageSheet" || "formSheet" || "overFullScreen"}
      >
        <View style={styles.modalcontainer}>
          <View style={{ flex: 1, width: '100%' }}>
            <View style={styles.modaltitle}>
              <Text style={styles.title}>Source</Text>
            </View>
            <Divider />
            <View style={{ flex: 7, width: '100%' }}>
              <Text>{article}</Text>
            </View>
            <Divider />
            <View style={styles.footerContainer}>
              <TouchableOpacity style={styles.button} onPress={() => setRightToggle(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};