//
//  MenuButton.swift
//  Chore Manager
//
//  Created by Jason Tan on 2023-01-22.
//

import SwiftUI

struct MenuButton: View {
    var label: String
    
    var body: some View {
        HStack (alignment: .center) {
            Text(label)
                .fontWeight(.bold)
                .padding(10)
                .overlay(Capsule(style: .continuous).stroke(.black, style: StrokeStyle(lineWidth: 2)))
        }
    }
}

struct MenuButton_Previews: PreviewProvider {
    static var previews: some View {
        MenuButton(label: "Example Text")
    }
}
